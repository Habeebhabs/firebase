import { Component, OnInit } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc,Firestore,collection } from '@angular/fire/firestore'
import { FormControl, FormGroup } from '@angular/forms';
import { doc, getDocs, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor(public auth:Auth,public firestore:Firestore) { }

  isLoading: boolean = false;
  ngOnInit(): void {
  }
  


    mainForm = new FormGroup({
    mail : new FormControl,
    password : new FormControl
  })

  signUp(){
    if(this.mainForm.controls['mail'].value !== null || '' && this.mainForm.controls['password'].value !== null || ''){
      this.isLoading = true;
      createUserWithEmailAndPassword(this.auth,this.mainForm.controls['mail'].value,this.mainForm.controls['password'].value)
      .then((response:any) => {
        console.log(response);
        this.isLoading = false;
      })
      .catch((err) => {
        alert(err.message);
        this.isLoading = false;
      })
    }
  }

  signIn(){
    this.isLoading = true;
    signInWithEmailAndPassword(this.auth,this.mainForm.controls['mail'].value,this.mainForm.controls['password'].value)
    .then((response:any) => {
      console.log(response);
      this.isLoading = false;
    })
    .catch((err) => {
      alert(err.message);
      this.isLoading = false;
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
