import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireFunctions} from "@angular/fire/functions";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

declare var Stripe;

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  // elements: Elements;
  // card: StripeElement;
  //
  // // optional parameters
  // elementsOptions: ElementsOptions = {
  //   locale: 'es'
  // };
  //
  // stripeTest: FormGroup;
  // intent;
  // sekret;
  //
  constructor(
      private fb: FormBuilder,
      private fns: AngularFireFunctions,
      private firestore: AngularFirestore) {}
  //

    stripe;
    card;
    sekret;

  ngOnInit() {
      this.firestore
          .collection("payments_intent").doc('sjsjsjshh8dasyug76').valueChanges()
          .pipe(tap((res:any) => {


          })).subscribe((res) => {
          if(!!res) {
              this.sekret = res.client_secret;
              console.log(this.sekret);
          } else {
              this.firestore
                  .collection("payments_intent")
                  .doc('sjsjsjshh8dasyug76') // id usera
                  .set({id: 'gayfagvavyia6776'})
          }
      })


      this.stripe = Stripe('pk_test_51GreGsIEfhKK9GVG5IpwkvuOXnwyYqr6sDt0qfliTzAg29vUlJ9PDXCIuV7iCcIbt8SMhm9G2UkMPCSyQCnH6oX800x0X4HyMm');
      var elements = this.stripe.elements();

      var style = {
          base: {
              color: "#32325d",
          }
      };

      this.card = elements.create("card", { style: style });
      this.card.mount("#card-element");
  }

  buy(){
      this.stripe.confirmCardPayment(this.sekret, {
          payment_method: {
              card: this.card,
              billing_details: {
                  name: 'Jenny Rosen'
              }
          }
      }).then(function(result) {
          if (result.error) {
              // Show error to your customer (e.g., insufficient funds)
              console.log(result.error.message);
          } else {
              // The payment has been processed!
              if (result.paymentIntent.status === 'succeeded') {
                  // Show a success message to your customer
                  // There's a risk of the customer closing the window before callback
                  // execution. Set up a webhook or plugin to listen for the
                  // payment_intent.succeeded event that handles any business critical
                  // post-payment actions.
              }
          }
      });
  }
  //   this.stripeTest = this.fb.group({
  //     name: ['', [Validators.required]]
  //   });
  //   this.stripeService.elements(this.elementsOptions)
  //       .subscribe(elements => {
  //         this.elements = elements;
  //         // Only mount the element the first time
  //         if (!this.card) {
  //           this.card = this.elements.create('card', {
  //             style: {
  //               base: {
  //                 iconColor: '#666EE8',
  //                 color: '#31325F',
  //                 lineHeight: '40px',
  //                 fontWeight: 300,
  //                 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //                 fontSize: '18px',
  //                 '::placeholder': {
  //                   color: '#CFD7E0'
  //                 }
  //               }
  //             }
  //           });
  //           this.card.mount('#card-element');
  //         }
  //       });
  //
  //

  //
  // }
  //
  // buy() {
  //   const name = this.stripeTest.get('name').value;
  //
  //   this.stripeService
  //       .createToken(this.card, { name })
  //       .subscribe(result => {
  //         if (result.token) {
  //           // Use the token to create a charge or a customer
  //           // https://stripe.com/docs/charges
  //           // this.firestore
  //           //     .collection("payments")
  //           //     .add(result.token)
  //           //     .then((res) => {
  //           //       console.log(res);
  //           //     })
  //           // console.log(this.firestore.collection("payments_intent").doc('sjsjsjshh8dasyug76').valueChanges().pipe(map((i:any) => i.client_secret)));
  //           // this.fns.httpsCallable('pay')({card: result.token.card, secret: this.sekret}).subscribe((data) => {
  //           //     console.log(data);
  //           // })
  //             const Stripe$: Observable<any> = this.stripeService.getStripeReference();
  //             const stripe = this.stripeService.getInstance();
  //
  //
  //             // stripe.
  //             // Stripe$.subscribe((res) => {
  //             //     console.log(res);
  //             //     res
  //             //         .confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
  //             //             payment_method: {
  //             //                 card: this.card,
  //             //                 billing_details: {
  //             //                     name: 'Jenny Rosen',
  //             //                 },
  //             //             },
  //             //         })
  //             //         .then(function(result) {
  //             //             // Handle result.error or result.paymentIntent
  //             //         });
  //             // })
  //             // this.stripeService.handleCardPayment(this.sekret, this.card).subscribe((res2) => {
  //             //     console.log(res2);
  //             // });
  //         } else if (result.error) {
  //           // Error creating the token
  //           console.log(result.error.message);
  //         }
  //       });
  // }

}
