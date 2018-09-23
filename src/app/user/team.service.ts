import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

import { AppSyncService } from '../app-sync.service';
import getTeams from '../graphql/queries/getTeams';
import subscribeToTeams from '../graphql/subscriptions/subscribeToTeams';
import createTeam from '../graphql/mutations/createTeam';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(public appSync: AppSyncService) {}

  getTeams(): Observable<Team[]> {
    return this.appSync.client.pipe(
      switchMap(client => {
        const query = client.watchQuery({
          query: getTeams,
        });
        query.subscribeToMore({
          document: subscribeToTeams,
          updateQuery: (
            prev: any,
            {
              subscriptionData: {
                data: { subscribeToTeams },
              },
            }: any
          ) => ({
            ...prev,
            getTeams: [...(prev.getTeams || []), subscribeToTeams],
          }),
        });
        return query;
      }),
      filter((response: any) => response && response.data),
      map((response: any) => response.data.getTeams)
    );
  }

  createTeam(payload: { name: string }): Observable<Team> {
    return this.appSync.client.pipe(
      switchMap(client =>
        client.mutate({
          mutation: createTeam,
          variables: {
            name: payload.name,
          },
        })
      ),
      map((response: any) => response.data.createTeam)
    );
  }
}
