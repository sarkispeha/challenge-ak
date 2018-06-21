import { FETCH_LESSONS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
      case FETCH_LESSONS :
        console.log('FETCHING LESSONS REDUCER');
      
          if(action.payload.length === 0){
            console.log('RETURNING OG STATE', state); 
            return state;
          }
          return action.payload;
          // eslint-disable-next-line
          const events = [
            {
              id: 0,
              title: 'All Day Event very long title',
              allDay: true,
              start: new Date(2018, 5, 0),
              end: new Date(2018, 5, 1),
            },
            {
              id: 1,
              title: 'Long Event',
              start: new Date(2018, 5, 7),
              end: new Date(2018, 5, 10),
            },
          
            // {
            //   id: 2,
            //   title: 'DTS STARTS',
            //   start: new Date(2018, 5, 13, 0, 0, 0),
            //   end: new Date(2018, 5, 20, 0, 0, 0),
            // },
          
            // {
            //   id: 3,
            //   title: 'DTS ENDS',
            //   start: new Date(2018, 5, 6, 0, 0, 0),
            //   end: new Date(2018, 5, 13, 0, 0, 0),
            // },
          
            {
              id: 4,
              title: 'Unix Event',
              start: new Date(2018, 5, 9, 0, 0, 0),
              end: new Date(2018, 5, 9, 0, 0, 0)
            },
            {
              id: 5,
              title: 'Conference',
              start: new Date(2018, 5, 11),
              end: new Date(2018, 5, 13),
              desc: 'Big conference for important people',
            },
            {
              id: 6,
              title: 'Meeting',
              start: new Date(2018, 5, 12, 10, 30, 0, 0),
              end: new Date(2018, 5, 12, 12, 30, 0, 0),
              desc: 'Pre-meeting meeting, to prepare for the meeting',
            },
            {
              id: 7,
              title: 'Lunch',
              start: new Date(2018, 5, 12, 12, 0, 0, 0),
              end: new Date(2018, 5, 12, 13, 0, 0, 0),
              desc: 'Power lunch',
            },
            {
              id: 8,
              title: 'Meeting',
              start: new Date(2018, 5, 12, 14, 0, 0, 0),
              end: new Date(2018, 5, 12, 15, 0, 0, 0),
            },
            {
              id: 9,
              title: 'Happy Hour',
              start: new Date(2018, 5, 12, 17, 0, 0, 0),
              end: new Date(2018, 5, 12, 17, 30, 0, 0),
              desc: 'Most important meal of the day',
            },
            {
              id: 10,
              title: 'Dinner',
              start: new Date(2018, 5, 12, 20, 0, 0, 0),
              end: new Date(2018, 5, 12, 21, 0, 0, 0),
            },
            // {
            //   id: 11,
            //   title: 'Birthday Party',
            //   start: new Date(2018, 5, 13, 7, 0, 0),
            //   end: new Date(2018, 5, 13, 10, 30, 0),
            // },
            // {
            //   id: 12,
            //   title: 'Late Night Event',
            //   start: new Date(2018, 5, 17, 19, 30, 0),
            //   end: new Date(2018, 5, 18, 2, 0, 0),
            // },
            // {
            //   id: 13,
            //   title: 'Multi-day Event',
            //   start: new Date(2018, 5, 20, 19, 30, 0),
            //   end: new Date(2018, 5, 22, 2, 0, 0),
            // },
            {
              id: 14,
              title: 'Today',
              start: new Date(new Date().setHours(new Date().getHours() - 3)),
              end: new Date(new Date().setHours(new Date().getHours() + 3)),
            },
        ];
          console.log('THE EVENTS', events);
          // return events;
        default:
          return state;
  }
}