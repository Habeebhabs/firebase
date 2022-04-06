import { Component, ElementRef, ViewChild } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc,Firestore,collection } from '@angular/fire/firestore'
import { FormControl, FormGroup } from '@angular/forms';
import { doc, getDocs, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-app';
  @ViewChild('element') element !: ElementRef;
  constructor( public auth:Auth,public firestore: Firestore) {
    // this.addData({email:'njdjn@gmail.com',password:'dfdfdvc'})
  }


  mainForm = new FormGroup({
    mail : new FormControl,
    password : new FormControl
  })

  signUp(){
    if(this.mainForm.controls['mail'].value !== null || '' && this.mainForm.controls['password'].value !== null || ''){
      this.element.nativeElement.style.display = 'block';
      createUserWithEmailAndPassword(this.auth,this.mainForm.controls['mail'].value,this.mainForm.controls['password'].value)
      .then((response:any) => {
        this.element.nativeElement.style.display = 'none';
        console.log(response);
      })
      .catch((err) => {
        alert(err.message);
      })
    }
  }

  signIn(){
    signInWithEmailAndPassword(this.auth,this.mainForm.controls['mail'].value,this.mainForm.controls['password'].value)
    .then((response:any) => {
      console.log(response);
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  addData(value:any){
    const dbinstance = collection(this.firestore,'users');
    addDoc(dbinstance,value)
    .then((response) => {
      console.log('ok');
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  data:any;

  getData(){
    const dbinstance = collection(this.firestore,'users');
    getDocs(dbinstance)
    .then((response) => {
      this.data = [...response.docs.map((item:any) => {
        return { ...item.data(), id:item.id }
      })];
      console.log(this.data)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  updateData(id:any){
    const dbinstance = doc(this.firestore,'users',id);
    updateDoc(dbinstance, {
      email: '123@gmail.com'
    })
    .then((response) => {
      this.getData()
      // alert('updated');
    })
    .catch((err) => {
      alert(err.message)
    })
  }
}