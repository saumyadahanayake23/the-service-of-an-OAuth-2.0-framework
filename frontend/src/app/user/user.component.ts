import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/api.service'
@Component({
  selector: 'app-posts-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private _ApiService: ApiService) { }

  response: any = {};
  repoData: any = [];

  ngOnInit() {

    var code = this.getCode();

    this._ApiService.createAccessToken(code)
      .subscribe((data) => {
        this._ApiService.setAccessToken(data);
        this._ApiService.getUser().subscribe((data) => {
          console.log(data);
          this.response = data;
        });
      });
  }

  getCode() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }
}
