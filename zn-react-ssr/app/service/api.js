'use strict'

const { Service } = require('egg')

class ApiService extends Service {
  index () {
    return {
      news: [
        {
          id: '1',
          title: 'title1'
        },
        {
          id: '2',
          title: 'title2'
        },
        { id: '3',
          title: 'title3'
        },
        { id: '4',
          title: 'title4'
        },
        { id: '5',
          title: 'title5'
        }
      ]
    }
  }
}

module.exports = ApiService
