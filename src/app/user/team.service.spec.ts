import { TestBed } from '@angular/core/testing';

import { AppSyncService } from '../app-sync.service';
import { TeamService } from './team.service';

describe('TeamService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AppSyncService],
    }));

  it('should be created', () => {
    const service: TeamService = TestBed.get(TeamService);
    expect(service).toBeTruthy();
  });
});
