import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('questions', {
  state() {
    return {
      questions: ['test'],
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
        console.log('data')
        const response = await fetch('http://localhost:8000/polls/1/')
        const data = await response.json()
        this.questions.push(data)
      }
      catch(e) {
        console.error(e)
      }
    }
  }
})

