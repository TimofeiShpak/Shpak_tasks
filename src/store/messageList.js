import { makeAutoObservable } from "mobx";

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
  
  const list = {
    'Saturday, October 20st': [missageOrlando, missageCarmen],
    'Sunday, October 21st': [firstMessage],
    'Monday, October 22nd': [secondMessage],
    'Yesterday': [thirdMessage],
    'Today': [fourthMessage, fifthMessage]
  }

class messageList {
    constructor() {
        makeAutoObservable(this);
    }

    get list() {
        return list;
    }
}

export default new messageList();