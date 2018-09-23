import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-create-team',
	templateUrl: './create-team.component.html',
	styleUrls: [ './create-team.component.scss' ]
})
export class CreateTeamComponent implements OnInit {
	@Output() create = new EventEmitter<Team>();
	form: FormGroup;

	constructor(public store: Store<any>, public fb: FormBuilder) {
		this.form = this.fb.group({
			name: this.fb.control('', [ Validators.required, Validators.minLength(3) ])
		});
	}

	ngOnInit() {}
}
