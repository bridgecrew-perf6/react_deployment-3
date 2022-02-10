(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[10],{588:function(e,t,n){"use strict";var c=n(7),a=Object(c.a)("div")((function(e){var t=e.theme;return{backgroundColor:"dark"===t.palette.mode?t.palette.background.default:t.palette.primary.light,minHeight:"100vh"}}));t.a=a},589:function(e,t,n){"use strict";var c=n(4),a=n(91),r=n(564),i=n(124),s=n(1),o=["children"];t.a=function(e){var t=e.children,n=Object(a.a)(e,o);return Object(s.jsx)(i.a,Object(c.a)(Object(c.a)({sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(s.jsx)(r.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},590:function(e,t,n){"use strict";var c=n(0);t.a=function(){var e=Object(c.useRef)(!0);return Object(c.useEffect)((function(){return function(){e.current=!1}}),[]),e}},591:function(e,t,n){"use strict";var c=n(542),a=n(123),r=n(781),i=n(1);t.a=function(){return Object(i.jsx)(c.a,{direction:"row",justifyContent:"space-between",children:Object(i.jsx)(a.a,{variant:"subtitle2",component:r.a,target:"_blank",underline:"hover",children:"\xa9 TipTipTop"})})}},597:function(e,t,n){"use strict";n.p},610:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return o}));var c=n(54),a=n.n(c),r=n(75),i=function(e,t){return fetch("http://52.90.192.153/api/orders",{method:"POST",headers:{Accept:"application/json","x-access-token":t},body:e}).then((function(e){return e.json()})).catch((function(e){console.log(e)}))},s=function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("http://52.90.192.153/api/braintree/processPayment",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return console.log("Response Process Payment:::::",e),e.json()})).catch((function(e){console.log(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(e,t){return fetch("http://52.90.192.153/api/products",{method:"POST",headers:{Accept:"application/json","x-access-token":e},body:t}).then((function(e){return e.json()})).catch((function(e){console.log(e)}))}},621:function(e,t,n){"use strict";var c=n(4),a=n(54),r=n.n(a),i=n(75),s=n(13),o=n(91),l=n(0),u=n(31),d=n(29),j=n(538),b=n(556),h=n(574),p=n(554),m=n(557),x=n(575),O=n(566),f=n(579),g=n(542),v=n(623),y=n(622),w=n(564),k=n(570),S=n(593),C=n(592),P=n(74),T=n(590),B=n(200),N=n(598),I=n.n(N),F=n(599),A=n.n(F),E=(n(597),n(1)),W=["loginProp"];t.a=function(e){e.loginProp;var t=Object(o.a)(e,W),n=Object(d.a)(),a=Object(T.a)(),N=(Object(j.a)(n.breakpoints.down("md")),Object(u.c)((function(e){return e.customization})),Object(l.useState)(!0)),F=Object(s.a)(N,2),q=F[0],D=F[1],H=Object(P.a)(),z=H.firebaseEmailPasswordSignIn,J=(H.firebaseGoogleSignIn,Object(l.useState)(!1)),M=Object(s.a)(J,2),_=M[0],R=M[1],G=function(){R(!_)},L=function(e){e.preventDefault()};return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)(b.a,{container:!0,direction:"column",justifyContent:"center",spacing:2}),Object(E.jsx)(C.a,{initialValues:{email:"",password:"",submit:null},validationSchema:S.a().shape({email:S.b().email("Must be a valid email").max(255).required("Email is required"),password:S.b().max(255).required("Password is required")}),onSubmit:function(){var e=Object(i.a)(r.a.mark((function e(t,n){var c,i,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.setErrors,i=n.setStatus,s=n.setSubmitting,e.prev=1,e.next=4,z(t.email,t.password).then((function(){}),(function(e){a.current&&(i({success:!1}),c({submit:e.message}),s(!1))}));case 4:e.next=10;break;case 6:e.prev=6,e.t0=e.catch(1),console.error(e.t0),a.current&&(i({success:!1}),c({submit:e.t0.message}),s(!1));case 10:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var a=e.errors,r=e.handleBlur,i=e.handleChange,s=e.handleSubmit,o=e.isSubmitting,l=e.touched,u=e.values;return Object(E.jsxs)("form",Object(c.a)(Object(c.a)({noValidate:!0,onSubmit:s},t),{},{children:[Object(E.jsxs)(h.a,{fullWidth:!0,error:Boolean(l.email&&a.email),sx:Object(c.a)({},n.typography.customInput),children:[Object(E.jsx)(p.a,{htmlFor:"outlined-adornment-email-login",children:"Email Address / Username"}),Object(E.jsx)(m.a,{id:"outlined-adornment-email-login",type:"email",value:u.email,name:"email",onBlur:r,onChange:i,label:"Email Address / Username",inputProps:{}}),l.email&&a.email&&Object(E.jsx)(x.a,{error:!0,id:"standard-weight-helper-text-email-login",children:a.email})]}),Object(E.jsxs)(h.a,{fullWidth:!0,error:Boolean(l.password&&a.password),sx:Object(c.a)({},n.typography.customInput),children:[Object(E.jsx)(p.a,{htmlFor:"outlined-adornment-password-login",children:"Password"}),Object(E.jsx)(m.a,{id:"outlined-adornment-password-login",type:_?"text":"password",value:u.password,name:"password",onBlur:r,onChange:i,endAdornment:Object(E.jsx)(O.a,{position:"end",children:Object(E.jsx)(f.a,{"aria-label":"toggle password visibility",onClick:G,onMouseDown:L,edge:"end",size:"large",children:_?Object(E.jsx)(I.a,{}):Object(E.jsx)(A.a,{})})}),label:"Password",inputProps:{}}),l.password&&a.password&&Object(E.jsx)(x.a,{error:!0,id:"standard-weight-helper-text-password-login",children:a.password})]}),Object(E.jsx)(g.a,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:Object(E.jsx)(v.a,{control:Object(E.jsx)(y.a,{checked:q,onChange:function(e){return D(e.target.checked)},name:"checked",color:"primary"}),label:"Remember me"})}),a.submit&&Object(E.jsx)(w.a,{sx:{mt:3},children:Object(E.jsx)(x.a,{error:!0,children:a.submit})}),Object(E.jsx)(w.a,{sx:{mt:2},children:Object(E.jsx)(B.a,{children:Object(E.jsx)(k.a,{disableElevation:!0,disabled:o,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]}))}})]})}},797:function(e,t,n){"use strict";n.r(t);var c=n(54),a=n.n(c),r=n(4),i=n(75),s=n(13),o=n(0),l=n(41),u=n(777),d=n.n(u),j=n(29),b=n(538),h=n(556),p=n(549),m=n(570),x=n(123),O=n(485),f=n(610),g=n(588),v=n(589),y=(n(621),n(201)),w=n(591),k=n(74),S=n(105),C=n.n(S),P=n(1);t.default=function(){var e=Object(j.a)(),t=(Object(k.a)().isLoggedIn,Object(b.a)(e.breakpoints.down("md")),Object(o.useState)(!1)),n=Object(s.a)(t,2),c=n[0],u=n[1],S=Object(o.useState)(""),T=Object(s.a)(S,2),B=T[0],N=T[1],I=Object(o.useState)(""),F=Object(s.a)(I,2),A=(F[0],F[1]),E=Object(o.useState)(""),W=Object(s.a)(E,2),q=W[0],D=W[1],H=Object(o.useState)(""),z=Object(s.a)(H,2),J=z[0],M=z[1],_=Object(o.useState)(0),R=Object(s.a)(_,2),G=R[0],L=R[1],U=Object(o.useState)(0),V=Object(s.a)(U,2),Y=(V[0],V[1],Object(o.useState)(10)),$=Object(s.a)(Y,2),K=$[0],Q=$[1],X=Object(o.useState)(0),Z=Object(s.a)(X,2),ee=Z[0],te=Z[1],ne=Object(o.useState)({loading:!1,success:!1,clientToken:null,error:"",instance:{},address:""}),ce=Object(s.a)(ne,2),ae=ce[0],re=ce[1];Object(o.useEffect)((function(){C.a.get("http://52.90.192.153/api/braintree/getToken").then((function(e){N(e.data.clientToken),re({clientToken:ae.clientToken}),console.log("token::::",e.data.clientToken)})).catch((function(e){console.log(e)}))}),[]),Object(o.useEffect)((function(){var e=function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var c=t[n].split("=");if(c[0]==e)return c[1]}return!1}("worker");C.a.get("http://52.90.192.153/api/products/".concat(e)).then((function(t){console.log("response CurrentWorker:::",t.data),D(e),M(t.data)})).catch((function(e){alert("fail get current worker"),console.log(e)}))}),[]);var ie=function(){var e=Object(i.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=new FormData).append("price",Number(ee)),t.append("term",Number(1)),t.append("trFee",Number(1)),t.append("dish",Number(1)),t.append("atmosphere",Number(1)),t.append("tasty",Number(1)),t.append("goodService",Number(1)),t.append("porcent",Number(K)),t.append("valueStar",Number(4)),t.append("idFirebase",q),t.append("product_id",q),t.append("product",JSON.stringify(J)),console.log("formData::",t),Object(f.a)(t,B).then((function(e){var t;console.log("datacreate",e),setTimeout((function(){A(e._id)}),1500),console.log("DATA INSTANCE:",ae),ae.instance.requestPaymentMethod().then((function(n){t=n.nonce,console.log("send nonce and total to process: ",t),console.log("price",ee);var c={paymentMethodNonce:t,orderId:e._id};Object(f.c)(c).then((function(e){console.log("response payment process:",e),!0===e.success&&alert("Payment successful")})).catch((function(e){console.log(e),re({loading:!1})}))})).catch((function(e){re(Object(r.a)(Object(r.a)({},ae),{},{error:e.message}))}))}));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c?Object(P.jsx)(g.a,{children:Object(P.jsxs)(h.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(P.jsx)(h.a,{item:!0,xs:12,children:Object(P.jsx)(h.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(P.jsx)(h.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(P.jsxs)(v.a,{children:[Object(P.jsx)(h.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:Object(P.jsx)(h.a,{item:!0,sx:{mb:3},children:Object(P.jsx)(l.b,{to:"#",children:Object(P.jsx)(y.a,{})})})}),Object(P.jsx)("div",{onBlur:function(){return re(Object(r.a)(Object(r.a)({},ae),{},{error:""}))},children:Object(P.jsx)(d.a,{options:{authorization:B},onInstance:function(e){console.log("INSTANCE ONLY:::",e),re(Object(r.a)(Object(r.a)({},ae),{},{instance:e}))}})}),Object(P.jsx)(h.a,{container:!0,xs:12,justifyContent:"center",children:Object(P.jsx)(m.a,{style:{background:"#8B0B35"},onClick:function(){return ie()},variant:"contained",children:"Pay"})})]})})})}),Object(P.jsx)(h.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(P.jsx)(w.a,{})})]})}):Object(P.jsx)(g.a,{children:Object(P.jsxs)(h.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(P.jsx)(h.a,{item:!0,xs:12,children:Object(P.jsx)(h.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(P.jsx)(h.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(P.jsx)(v.a,{children:Object(P.jsxs)(h.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(P.jsx)(h.a,{item:!0,sx:{mb:3},children:Object(P.jsx)(l.b,{to:"#",children:Object(P.jsx)(y.a,{})})}),Object(P.jsx)(h.a,{item:!0,xs:12,children:Object(P.jsx)(p.a,{id:"outlined-basic",label:"Bill Amount",value:G,variant:"outlined",fullWidth:!0,onChange:function(e){L(e.target.value),10===K&&te((.1*e.target.value).toFixed(2)),15===K&&te((.15*e.target.value).toFixed(2)),20===K&&te((.2*e.target.value).toFixed(2))}})}),Object(P.jsxs)(h.a,{container:!0,style:{marginTop:12},children:[Object(P.jsx)(h.a,{item:!0,xs:2}),Object(P.jsx)(h.a,{item:!0,xs:1,children:Object(P.jsx)(m.a,{style:{background:"#8B0B35"},variant:"contained",onClick:function(){Q(10),te((.1*G).toFixed(2))},children:"10%"})}),Object(P.jsx)(h.a,{item:!0,xs:2}),Object(P.jsx)(h.a,{item:!0,xs:1,children:Object(P.jsx)(m.a,{style:{background:"#8B0B35"},variant:"contained",onClick:function(){Q(15),te((.15*G).toFixed(2))},children:"15%"})}),Object(P.jsx)(h.a,{item:!0,xs:2}),Object(P.jsx)(h.a,{item:!0,xs:1,children:Object(P.jsx)(m.a,{style:{background:"#8B0B35"},onClick:function(){Q(20),te((.2*G).toFixed(2))},variant:"contained",children:"20%"})})]}),Object(P.jsx)(h.a,{item:!0,xs:12,children:Object(P.jsx)(x.a,{children:"Tips   $".concat(ee)})}),Object(P.jsx)(h.a,{item:!0,xs:12,children:Object(P.jsx)(O.a,{})}),Object(P.jsx)(h.a,{item:!0,xs:12,justifyContent:"center",children:Object(P.jsx)(m.a,{style:{background:"#8B0B35"},onClick:function(){return u(!0)},variant:"contained",children:"Proceed to Payment"})})]})})})})}),Object(P.jsx)(h.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(P.jsx)(w.a,{})})]})})}}}]);
//# sourceMappingURL=10.c3dbc2db.chunk.js.map