import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('questions', {
  state() {
    return {
      questions: ['initialState'],
    }
  },

  getters: {
    getQuestions(state) {
      return state.questions
    }
  },

  actions: {
    async fetchQuestions() {
      try{
        const response = await fetch('http://localhost:8000/polls/1/')
        const data = await response.json()
        this.questions = data.test
        console.log(this.questions)
      }
      catch(e) {
        console.error(e)
      }
    }
  }
})

