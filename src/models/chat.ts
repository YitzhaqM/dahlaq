import { Message } from "./message"
export class Chat {
  summary={
    users:{},
    lastMessage:{},
    chatId:"",
    lastTime:"",
  }
  content={
    messages:{},
    pictures:{},
    videos:{},
    files:{}
  }

  constructor(private message?:Message) {
    // Quick and dirty extend/assign fields to this model
  }

}
