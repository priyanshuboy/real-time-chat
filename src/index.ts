import { Socket } from 'dgram';
import { WebSocketServer  } from 'ws';


const wss = new WebSocketServer({ port: 8080 });
 let allClients: Socket[] = [];
 let userCount = 0;
//1. Handle new client connections
 wss.on('connection', (socket:Socket) =>{
     console.log('New client connected');
     userCount++;
     allClients.push(socket);
     socket.send(`Welcome! There are currently ${userCount} users connected.`);  
     
     //2. Handle incoming messages from clients
     socket.on('message', (message: string) => {
         console.log(`Received message: ${message}`);
         
         for(let i =0; i < allClients.length; i++){
            if(allClients[i] !== socket){
                allClients[i].send(`User says: ${message}`);
            }
         }
         setTimeout(() => {
             socket.send(`Server received: ${message}`)
         },  1000);

     })

     //3. Handle client disconnection
     socket.on('close', () => {
                console.log('Client disconnected');
                userCount--;
            })
    
            
    })




