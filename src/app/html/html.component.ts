import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {SimplePage} from './simple-page.type'
import {ActivatedRoute, Router} from '@angular/router'
import {HtmlService} from './html.service'
import {map, shareReplay, switchMap} from 'rxjs/operators'
import {appAnimations} from '../app.animations'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: appAnimations
})
export class HtmlComponent implements OnInit, OnDestroy {

  subs: Array<Subscription> = []
  page$: Observable<SimplePage>
  html: SafeHtml

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private service: HtmlService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.page$ = this.route.params
      .pipe(
        switchMap(({slug}) => {
          return this.service.getSimplePageBySlug(slug)
        }),
        map(pages => pages[0]),
        shareReplay()
      )

    this.subs.push(this.page$.subscribe(page => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(page.data.content)
      if (!page) {
        return this.router.navigateByUrl('p/404')
      }
    }, () => alert('Нет связи с сервером. Попробуйте обновить страницу или зайти позже')))
  }

  ngOnDestroy(): void {
    for (const subscription of this.subs) {
      subscription.unsubscribe()
    }
  }
}
