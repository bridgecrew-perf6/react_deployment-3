(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[14],{584:function(e,c,a){"use strict";a(29),a(804),a(490),a(780),a(585),a(1)},585:function(e,c,a){"use strict";var t=a(4),i=a(91),n=a(29),r=a(558),d=a(1),s=["color","outline","size","sx"];c.a=function(e){var c=e.color,a=e.outline,l=e.size,b=e.sx,o=Object(i.a)(e,s),h=Object(n.a)(),j=c&&!a&&{color:h.palette.background.paper,bgcolor:"".concat(c,".main")},p=a&&{color:c?"".concat(c,".main"):"primary.main",bgcolor:h.palette.background.paper,border:"2px solid",borderColor:c?"".concat(c,".main"):"primary.main"},O={};switch(l){case"badge":O={width:h.spacing(3.5),height:h.spacing(3.5)};break;case"xs":O={width:h.spacing(4.25),height:h.spacing(4.25)};break;case"sm":O={width:h.spacing(5),height:h.spacing(5)};break;case"lg":O={width:h.spacing(9),height:h.spacing(9)};break;case"xl":O={width:h.spacing(10.25),height:h.spacing(10.25)};break;case"md":O={width:h.spacing(7.5),height:h.spacing(7.5)};break;default:O={}}return Object(d.jsx)(r.a,Object(t.a)({sx:Object(t.a)(Object(t.a)(Object(t.a)(Object(t.a)({},j),p),O),b)},o))}},806:function(e,c,a){"use strict";a.r(c);var t=a(556),i=a(123),n=a(13),r=a(0),d=a(807),s=a(808),l=a(809),b=a(810),o=a(811),h=a(812),j=a(655),p=a.n(j),O=(a(584),a(57)),g=a(157),x=a.n(g),u=a(1);function f(e,c,a,t,i){return{order:e,status:c,paid:a,date:t,total:i}}f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30"),f("61bed7441cdeea5825cd58fc","Open","Paid","19-12-2021 01:55 AM","3.30");function m(){var e=Object(r.useState)([]),c=Object(n.a)(e,2),a=c[0],j=c[1];return Object(r.useEffect)((function(){x.a.get("http://52.90.192.153/api/orders").then((function(e){console.log(e.data),j(e.data)})).catch((function(e){console.log(e)}))}),[]),Object(u.jsx)(t.a,{container:!0,spacing:O.b,children:Object(u.jsx)(t.a,{item:!0,xs:12,children:Object(u.jsx)(i.a,{content:!1,title:"All Transactions",children:Object(u.jsx)(d.a,{children:Object(u.jsxs)(s.a,{sx:{minWidth:350},"aria-label":"simple table",children:[Object(u.jsx)(l.a,{children:Object(u.jsxs)(b.a,{children:[Object(u.jsx)(o.a,{sx:{pl:3},children:"Order Number"}),Object(u.jsx)(o.a,{align:"right",children:"Status"}),Object(u.jsx)(o.a,{align:"right",children:"Is Paid"}),Object(u.jsx)(o.a,{align:"right",sx:{pl:3},children:"Date"}),Object(u.jsx)(o.a,{align:"right",children:"Total"})]})}),Object(u.jsx)(h.a,{children:a.map((function(e){return Object(u.jsxs)(b.a,{hover:!0,children:[Object(u.jsx)(o.a,{sx:{pl:3},component:"th",scope:"row",children:e.product_id}),Object(u.jsx)(o.a,{align:"right",children:e.status}),Object(u.jsx)(o.a,{align:"right",children:e.is_paid?"Yes":"No"}),Object(u.jsx)(o.a,{align:"right",children:Object(u.jsx)(p.a,{format:"YYYY/MM/DD HH:hh",children:e.order_date})}),Object(u.jsx)(o.a,{align:"right",children:"$".concat(e.order_total)})]},e.product_id)}))})]})})})})})}c.default=function(){return Object(u.jsx)(i.a,{title:"Tips",children:Object(u.jsx)(t.a,{container:!0,children:Object(u.jsx)(t.a,{item:!0,xs:12,children:Object(u.jsx)(m,{})})})})}}}]);
//# sourceMappingURL=14.ee27dcb6.chunk.js.map