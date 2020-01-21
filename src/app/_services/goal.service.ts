import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User, Goal } from '@/_models';

@Injectable({ providedIn: 'root' })
export class GoalService {
    constructor(private http: HttpClient) { }

    getgoals(user: User) {
        return this.http.get<any>(`https://${config.apiUrl}/api/Goal/GetUserGoals/${user.userId}`)
        .pipe(map(goal => {
            localStorage.setItem('Goal', JSON.stringify(goal));
            console.log(goal);
            return goal;
        }));
    }

    creategoal(user: User, goal: Goal) {
        return this.http.post<any>(`https://${config.apiUrl}/api/Goal/CreateGoal/${user.userId}`, 
        {
            "name": goal.name,
            "amount": goal.amount,
            "currentAmount": goal.currentAmount
        }
        );
    }

    changegoal(user:User, goal:Goal) {
        return this.http.put<any>(`https://${config.apiUrl}/api/Goal/SetGoal/${user.userId}`,
        {
            "goalId": goal.goalId,
            "name": goal.name,
            "amount": goal.amount,
            "currentAmount": goal.currentAmount
        }
        );
    }

    deletegoal(user:User, goal:Goal) {
        return this.http.delete<any>(`https://${config.apiUrl}/api/Goal/DeleteGoal/${user.userId}?goalId=${goal.goalId}`);
    }
}
