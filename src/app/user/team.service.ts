import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { AppSyncService } from '../app-sync.service';
import getTeams from '../graphql/queries/getTeams';
import subscribeToTeams from '../graphql/subscriptions/subscribeToTeams';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(public appSync: AppSyncService) {}

  getTeams() {
    return this.appSync.client.pipe(
      switchMap(client => {
        const query = client.watchQuery({
          query: getTeams,
        });
        query.subscribeToMore({
          document: subscribeToTeams,
          updateQuery: (
            prev,
            {
              subscriptionData: {
                data: { subscribeToTeams },
              },
            }
          ) => ({
            ...prev,
            getTeams: [...(prev.getTeams || []), subscribeToTeams],
          }),
        });
        return query;
      })
    );
  }
}
