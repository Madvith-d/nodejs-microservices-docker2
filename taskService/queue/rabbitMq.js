import amqplib from "amqplib";
import dotenv from "dotenv";
dotenv.config();
export const connectRabbitMq = (retries=5 , delay=1000) => {
    while(retries){
        try {
            const connection = amqplib.connect(process.env.RABBITMQ_URL);
            console.log("RabbitMQ connection successful")
            return connection
        } catch (error) {
            retries--
            console.log("RabbitMQ connection error", error)
            setTimeout(() => {
                console.log("Retrying RabbitMQ connection")
            }, delay)
        }
    }
}

export const createChannel = async (connection) => {
    try{
        const channel = await connection.createChannel()
        console.log("RabbitMQ channel created")
        return channel
    }catch(error){
        console.log("RabbitMQ channel error", error)
        throw error
    }
}
export const assertQueue = async (channel) =>{
    try{
        const queue = await channel.assertQueue(process.env.QUEUE_NAME)
        console.log("RabbitMQ queue created")
        return queue
    }catch(error){
        console.log("RabbitMQ queue error", error)
        throw error
    }
}