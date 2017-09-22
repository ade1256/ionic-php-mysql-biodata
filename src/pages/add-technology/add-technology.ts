import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-add-technology',
  templateUrl: 'add-technology.html'
})
export class AddTechnology {

   public form                   : FormGroup;
   public biodataNamaDepan       : any;
   public biodataNamaBelakang    : any;
   public biodataJenisKelamin    : any;
   public biodataAlamat          : any;
   public biodataNoTelp          : any;
   public biodataEmail           : any;
   public isEdited               : boolean = false;
   public hideForm               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;
   private baseURI               : string  = "http://localhost/ionicbiodata/";

   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : Http,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "namaDepan"                  : ["", Validators.required],
         "namaBelakang"               : ["", Validators.required],
         "jenisKelamin"               : ["", Validators.required],
         "alamat"                     : ["", Validators.required],
         "noTelp"                     : ["", Validators.required],
         "email"                      : ["", Validators.required]

      });
   }



   // Determine whether we adding or editing a record
   // based on any supplied navigation parameters
   ionViewWillEnter()
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }



   // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
   selectEntry(item)
   {
      this.biodataNamaDepan       = item.namaDepan;
      this.biodataNamaBelakang    = item.namaBelakang;
      this.biodataJenisKelamin    = item.jenisKelamin;
      this.biodataAlamat          = item.alamat;
      this.biodataNoTelp          = item.noTelp;
      this.biodataEmail           = item.email;
      this.recordID               = item.idBiodata;
   }



   // Save a new record that has been added to the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of create followed by the key/value pairs
   // for the record data
   createEntry(namaDepan, namaBelakang, jenisKelamin, alamat, noTelp, email)
   {
      let body     : string   = "key=create&namaDepan=" + namaDepan + "&namaBelakang=" + namaBelakang + "&jenisKelamin=" + jenisKelamin + "&alamat=" + alamat + "&noTelp=" + noTelp + "&email=" + email,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "manage.php";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm   = true;
            this.sendNotification(`Congratulations the technology: ${namaDepan} was successfully added`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }



   // Update an existing record that has been edited in the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of update followed by the key/value pairs
   // for the record data
   updateEntry(namaDepan, namaBelakang, jenisKelamin, alamat, noTelp, email)
   {
      let body       : string = "key=update&namaDepan=" + namaDepan + "&namaBelakang=" + namaBelakang + "&jenisKelamin=" + jenisKelamin + "&alamat=" + alamat + "&noTelp=" + noTelp + "&email=" + email + "&recordID=" + this.recordID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = this.baseURI + "manage.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm  =  true;
            this.sendNotification(`Congratulations the technology: ${namaDepan} was successfully updated`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }



   // Remove an existing record that has been selected in the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of delete followed by the key/value pairs
   // for the record ID we want to remove from the remote database
   deleteEntry()
   {
      let namaDepan       : string = this.form.controls["namaDepan"].value,
          body       : string    = "key=delete&recordID=" + this.recordID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any    = new Headers({ 'Content-Type': type}),
          options    : any    = new RequestOptions({ headers: headers }),
          url        : any    = this.baseURI + "manage.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm     = true;
            this.sendNotification(`Congratulations the technology: ${namaDepan} was successfully deleted`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }



   // Handle data submitted from the page's HTML form
   // Determine whether we are adding a new record or amending an
   // existing record
   saveEntry()
   {
      let namaDepan            : string = this.form.controls["namaDepan"].value,
          namaBelakang         : string = this.form.controls["namaBelakang"].value,
          jenisKelamin         : string = this.form.controls["jenisKelamin"].value,
          alamat               : string = this.form.controls["alamat"].value,
          noTelp               : string = this.form.controls["noTelp"].value,
          email                : string = this.form.controls["email"].value;

      if(this.isEdited)
      {
         this.updateEntry(namaDepan, namaBelakang, jenisKelamin, alamat, noTelp, email);
      }
      else
      {
         this.createEntry(namaDepan, namaBelakang, jenisKelamin, alamat, noTelp, email);
      }
   }



   // Clear values in the page's HTML form fields
   resetFields() : void
   {
      this.biodataNamaDepan           = "";
      this.biodataNamaBelakang    = "";
      this.biodataJenisKelamin    = "";
      this.biodataAlamat    = "";
      this.biodataNoTelp    = "";
      this.biodataEmail    = "";
   }



   // Manage notifying the user of the outcome
   // of remote operations
   sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }



}