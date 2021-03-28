import Navigation from './navigation/Navigation';
import Main from './main/Main';
import Profile from './profile/Profile';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";

const missageCarmen = {
  author : 'Carmen Velasco', 
  id : 'Carmen Velasco', 
  time : '6:48 PM', 
  dataMessage : [
    {text:  'Hello! How are you?'}
  ], 
  avatarSrc : './Shape2.svg'
}

const missageOrlando = {
  author : 'Orlando Diggs', 
  id : 'Orlando Diggs', 
  time : '5:48 PM', 
  dataMessage : [
    {text:  'Hello'}
  ], 
  avatarSrc : './Shape1.svg'
}

const firstMessage = {
  author : 'Jeshua Stout', 
  id : 'Jeshua Stout', 
  time : '6:38 PM', 
  dataMessage : [
    {addressee: '@pierrhack'},
    {text:  'I did for 6 days in Iceland'}
  ], 
  avatarSrc : './Shape7.svg'
};

const secondMessage = {
  author : 'Harold Adams', 
  id : 'Harold Adams', 
  time : '5:02 PM', 
  dataMessage : [
    {text: 'Which country to visit next? This is a photo with my friends - celebrating in Bali 😎'},
    {link: 'my-top-places.jpg'},
    {img : { 
      src: './Photo.png',
      likes: 3}
    }
  ], 
  avatarSrc : './Shape8.svg',
}

const thirdMessage = {
  author : 'Aada Laine', 
  id : 'Aada Laine', 
  time : '11:54 AM', 
  dataMessage : [
    {addressee: '@har_adams'},
    {text: 'wow it’s amazing, I want to buy a van and travelling next year 🚌'},
  ], 
  avatarSrc : './Shape9.svg',
}

const fourthMessage = {
  author : 'Nala Hester', 
  id : 'Nala Hester', 
  time : '11:54 AM', 
  dataMessage : [
    {text: `Working from a van in Australia isn’t feasible if you need internet. 
           It may have improved over the last years but I spent some time in a camper van 
           around Tasmania and internet was a real problem (and Tasmania is tiny compared to the rest of the country).`}
  ], 
  avatarSrc : './Shape10.svg'
};

const fifthMessage = {
  author : 'Ramon Bateman', 
  id : 'Ramon Bateman', 
  time : '11:59 AM', 
  dataMessage : [
    {addressee : '@aa_da'},
    {text: `What's the reason for the van? Saving money or just like to get outside? 
           If you've got a stable source of income you could always do some short term Airbnbs
           + buy a truck/topper, build a platform in the back. That way you can always convert 
           it back to a truck and sleep in an apartment if you want.`}
  ], 
  avatarSrc : './Shape11.svg'
};

const messages = {
  'Saturday, October 20st': [missageOrlando, missageCarmen],
  'Sunday, October 21st': [firstMessage],
  'Monday, October 22nd': [secondMessage],
  'Yesterday': [thirdMessage],
  'Today': [fourthMessage, fifthMessage]
}

const mainContent = {
  name : '#general',
  numberSubscribers : 1093,
  messages: messages,
}

const profileData = {
  status: 'online',
  imgSrc : './user-avatar.png',
  fullName : 'Amilia Luna',
  specialty : 'UI Designer',
  socialSrc : {
    facebook : '',
    instagram : '',
    twitter : '',
    LinkedIn : '',
  },
  extraInfo: {
    userName : '@amilia_lu',
    Email : 'a-luna@gmail.com',
    Skype : 'amiluna',
    Timezone : '2:21 PM Local time'
  }
}

const list = [{src:'', text:'All treads', id:'AllTreads', src:'../assets/icons/all-treads.svg'}]
const channelsList = [
    {text: 'general', id: 'general'}, 
    {text: 'support', id: 'support'}, 
    {text: 'marketing', id: 'marketing'}, 
    {text: 'thailand', id: 'thailand'},
    {text: 'bali', id: 'bali'}, 
    {text: 'poland', id: 'poland'},
    {text: 'australia', id: 'australia'}, 
    {text: 'jobs', id: 'jobs'}, 
    {text: 'startups', id: 'startups'}, 
    {text: 'italy', id: 'italy'},
    {text: 'freelance', id: 'freelance'}
]

const friendsList = [
    {status: 'online', text: 'Orlando Diggs', id: 'Orlando Diggs', src: './Shape1.svg'},
    {status: 'online', text: 'Carmen Velasco', id: 'Carmen Velasco', src: './Shape2.svg'},
    {status: 'offline', text: 'Marie Jensen', id: 'Marie Jensen', src: './Shape3.svg'},
    {status: 'offline', text: 'Alex Lee', id: 'Alex Lee', src: './Shape4.svg'},
    {status: 'offline', text: 'Leo Gill', id: 'Leo Gill', src: './Shape5.svg'},
    {status: 'offline', text: 'Britney Cooper', id: 'Britney Cooper', src: './Shape6.svg'},
    {status: 'offline', text: 'Jeshua Stout', id: 'Jeshua Stout', src: './Shape7.svg'},
    {status: 'offline', text: 'Harold Adams', id: 'Harold Adams', src: './Shape8.svg'},
    {status: 'offline', text: 'Aada Laine', id: 'Aada Laine', src: './Shape9.svg'},
    {status: 'offline', text: 'Nala Hester', id: 'Nala Hester', src: './Shape10.svg'},
    {status: 'offline', text: 'Ramon Bateman', id: 'Ramon Bateman', src: './Shape11.svg'},
]

const navigationData = {
  friendsList: friendsList,
  channelsList: channelsList,
  list: list,
}

function App() {
  let [activeChannel, setActiveChannel] = useState(0);
  let channelPath = `/${channelsList[activeChannel].text}`;
  mainContent.name = channelsList[activeChannel].text;
  return (
    <Router>
      <Redirect to={channelPath} />

      <Route path={channelPath}>
        <div className='App'>
          <Navigation activeChannel={activeChannel} data={navigationData} setActiveChannel={setActiveChannel} />
          <Main content = {mainContent} />
          <Profile data = {profileData} />
        </div>
      </Route>
    </Router>
  );
}

export default App;
