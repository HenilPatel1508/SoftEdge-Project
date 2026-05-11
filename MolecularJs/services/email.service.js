import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

broker.createService({
  name: "email",
  actions: {
    async sendEmail(ctx){
        const {recipent,subject,content} = ctx.params;
    //Simulated email logic
    
    console.log(`Sending Emaiil to ${recipent} with Subject ${subject} `);
    
    console.log(`Content : ${content}`);
    
    return `Email Sent to ${recipent}`
    }
  },
});

export default broker;
