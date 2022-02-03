(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[11],{588:function(e,t,n){"use strict";var a=n(7),r=Object(a.a)("div")((function(e){var t=e.theme;return{backgroundColor:"dark"===t.palette.mode?t.palette.background.default:t.palette.primary.light,minHeight:"100vh"}}));t.a=r},589:function(e,t,n){"use strict";var a=n(4),r=n(91),i=n(564),c=n(123),s=n(1),l=["children"];t.a=function(e){var t=e.children,n=Object(r.a)(e,l);return Object(s.jsx)(c.a,Object(a.a)(Object(a.a)({sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(s.jsx)(i.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},590:function(e,t,n){"use strict";var a=n(0);t.a=function(){var e=Object(a.useRef)(!0);return Object(a.useEffect)((function(){return function(){e.current=!1}}),[]),e}},591:function(e,t,n){"use strict";var a=n(542),r=n(122),i=n(781),c=n(1);t.a=function(){return Object(c.jsx)(a.a,{direction:"row",justifyContent:"space-between",children:Object(c.jsx)(r.a,{variant:"subtitle2",component:i.a,href:"#",target:"_blank",underline:"hover",children:"\xa9 TipTipTop"})})}},818:function(e,t,n){"use strict";n.r(t);var a=n(41),r=n(29),i=n(538),c=n(556),s=n(122),l=n(485),o=n(588),j=n(589),d=n(201),u=n(4),b=n(54),m=n.n(b),x=n(74),h=n(574),O=n(554),p=n(557),f=n(575),g=n(564),v=n(570),y=n(31),w=n(24),k=n(593),S=n(592),C=n(200),E=n(75),I=n(590),A=n(16),B=n(1),T=function(e){var t=Object.assign({},e),n=Object(r.a)(),a=Object(I.a)(),i=Object(y.b)(),c=Object(w.e)(),s=Object(E.a)().resetPassword;return Object(B.jsx)(S.a,{initialValues:{email:"",password:"",submit:null},validationSchema:k.a().shape({email:k.b().email("Must be a valid email").max(255).required("Email is required")}),onSubmit:function(){var e=Object(x.a)(m.a.mark((function e(t,n){var r,l,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.setErrors,l=n.setStatus,o=n.setSubmitting,e.prev=1,e.next=4,s(t.email);case 4:a.current&&(l({success:!0}),o(!1),i({type:A.H,open:!0,message:"Check mail for reset password link",variant:"alert",alertSeverity:"success"}),setTimeout((function(){c("/login",{replace:!0})}),1500)),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0),a.current&&(l({success:!1}),r({submit:e.t0.message}),o(!1));case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var a=e.errors,r=e.handleBlur,i=e.handleChange,c=e.handleSubmit,s=e.isSubmitting,l=e.touched,o=e.values;return Object(B.jsxs)("form",Object(u.a)(Object(u.a)({noValidate:!0,onSubmit:c},t),{},{children:[Object(B.jsxs)(h.a,{fullWidth:!0,error:Boolean(l.email&&a.email),sx:Object(u.a)({},n.typography.customInput),children:[Object(B.jsx)(O.a,{htmlFor:"outlined-adornment-email-forgot",children:"Email Address / Username"}),Object(B.jsx)(p.a,{id:"outlined-adornment-email-forgot",type:"email",value:o.email,name:"email",onBlur:r,onChange:i,label:"Email Address / Username",inputProps:{}}),l.email&&a.email&&Object(B.jsx)(f.a,{error:!0,id:"standard-weight-helper-text-email-forgot",children:a.email})]}),a.submit&&Object(B.jsx)(g.a,{sx:{mt:3},children:Object(B.jsx)(f.a,{error:!0,children:a.submit})}),Object(B.jsx)(g.a,{sx:{mt:2},children:Object(B.jsx)(C.a,{children:Object(B.jsx)(v.a,{disableElevation:!0,disabled:s,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Send Mail"})})})]}))}})},H=n(591);t.default=function(){var e=Object(r.a)(),t=Object(E.a)().isLoggedIn,n=Object(i.a)(e.breakpoints.down("md"));return Object(B.jsx)(o.a,{children:Object(B.jsxs)(c.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsx)(c.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(B.jsx)(c.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(B.jsx)(j.a,{children:Object(B.jsxs)(c.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(B.jsx)(c.a,{item:!0,sx:{mb:3},children:Object(B.jsx)(a.b,{to:"#",children:Object(B.jsx)(d.a,{})})}),Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsxs)(c.a,{container:!0,alignItems:"center",justifyContent:"center",textAlign:"center",spacing:2,children:[Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsx)(s.a,{color:e.palette.secondary.main,gutterBottom:!0,variant:n?"h3":"h2",children:"Forgot password?"})}),Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsx)(s.a,{variant:"caption",fontSize:"16px",textAlign:"center",children:"Enter your email address below and we'll send you password reset OTP."})})]})}),Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsx)(T,{})}),Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsx)(l.a,{})}),Object(B.jsx)(c.a,{item:!0,xs:12,children:Object(B.jsx)(c.a,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:Object(B.jsx)(s.a,{component:a.b,to:t?"/pages/login/login3":"/login",variant:"subtitle1",sx:{textDecoration:"none"},children:"Already have an account?"})})})]})})})})}),Object(B.jsx)(c.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(B.jsx)(H.a,{})})]})})}}}]);
//# sourceMappingURL=11.c03c0a4c.chunk.js.map