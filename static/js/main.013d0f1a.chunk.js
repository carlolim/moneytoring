(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{220:function(e,t,a){e.exports=a(383)},352:function(e,t,a){},379:function(e,t,a){},383:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(27),l=a.n(o),c=a(16),s=a(17),i=a(19),u=a(18),m=a(20),h=a(387),d=a(386),p=a(10),y=a(43),g=a.n(y),f=a(44),b=a.n(f),E=a(22),v=a.n(E),w=a(23),x=a.n(w),j=a(152),O=a.n(j),k=a(384),I=a(49),C=a.n(I),D=a(38),S=a.n(D),M=a(61),N=a.n(M),F=a(45),B=a.n(F),A=a(151),T=a.n(A),P=a(89),Y=a.n(P),W=a(88),V=a.n(W),q=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{width:"250px"}},r.a.createElement(C.a,null,r.a.createElement(k.a,{to:"/",style:{textDecoration:"none"}},r.a.createElement(S.a,null,r.a.createElement(N.a,null,r.a.createElement(T.a,null)),r.a.createElement(B.a,{primary:"Dashboard"}))),r.a.createElement(k.a,{to:"/expense",style:{textDecoration:"none"}},r.a.createElement(S.a,null,r.a.createElement(N.a,null,r.a.createElement(V.a,null)),r.a.createElement(B.a,{primary:"Expense"}))),r.a.createElement(k.a,{to:"/income",style:{textDecoration:"none"}},r.a.createElement(S.a,null,r.a.createElement(N.a,null,r.a.createElement(Y.a,null)),r.a.createElement(B.a,{primary:"Income"})))))}}]),t}(n.Component),R=a(83),z=a.n(R),H={root:{flexGrow:1,paddingTop:56},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}},L=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isOpen:!1},a.toggleDrawer=function(){a.setState({isOpen:!a.state.isOpen})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:H.root},r.a.createElement(z.a,{open:this.state.isOpen,onClose:this.toggleDrawer,onOpen:this.toggleDrawer,disableBackdropTransition:!0},r.a.createElement("div",{tabIndex:0,role:"button",onClick:this.toggleDrawer,onKeyDown:this.toggleDrawer},r.a.createElement(q,null))),r.a.createElement(g.a,{position:"fixed"},r.a.createElement(b.a,null,r.a.createElement(x.a,{onClick:this.toggleDrawer,style:H.menuButton,color:"inherit","aria-label":"Menu"},r.a.createElement(O.a,null)),r.a.createElement(v.a,{variant:"h6",color:"inherit",style:H.grow},this.props.title),this.props.buttons.map(function(e,t){return r.a.createElement("span",{key:t},e)}))))}}]),t}(n.Component),G=a(46),J=a.n(G),K=a(92),U=a.n(K),$=a(153),Q=a.n($),X=a(68),Z=a.n(X),_=a(21),ee=a.n(_),te=a(30),ae=a(57),ne=a.n(ae),re=a(60),oe=a.n(re),le=a(58),ce=a.n(le),se=a(59),ie=a.n(se),ue=a(37),me=a.n(ue),he=a(90),de=a.n(he),pe=a(91),ye=a.n(pe),ge={daily:1,weekly:2,monthly:3},fe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={filterType:ge.daily,from:ee()().hours(0).minutes(0).seconds(0),to:ee()().hours(23).minutes(59).seconds(59),filterDate:"",data:[],total:0},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.loadSummary()}},{key:"generateFilterDate",value:function(){var e=this.state.from.format("MMM DD");this.state.filterType!==ge.daily&&(e=this.state.from.format("MMM DD")+" - "+this.state.to.format("MMM DD")),this.setState(Object(p.a)({},this.state,{filterDate:e}))}},{key:"loadSummary",value:function(){var e=this,t=IDBKeyRange.bound(this.state.from.toDate(),this.state.to.toDate()),a=[],n=[],r=0,o=[];indexedDB.open("Moneytoring").onsuccess=function(l){var c=l.target.result.transaction(["expense","category"],"readonly"),s=c.objectStore("expense").index("date").openCursor(t,"prev"),i=c.objectStore("category").getAll();s.onsuccess=function(e){var t=e.target.result;t&&(a.push(t.value),r+=t.value.amount,t.continue())},i.onsuccess=function(e){n=e.target.result},c.oncomplete=function(){for(var t=0;t<n.length;t++)o.push({category:n[t],items:a.filter(function(e){return e.categoryId===n[t].categoryId})});e.setState(Object(p.a)({},e.state,{data:o,total:r})),e.generateFilterDate()}}}},{key:"changeFilterType",value:function(){}},{key:"next",value:function(){}},{key:"prev",value:function(){}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(ne.a,{className:e.card},r.a.createElement(ce.a,{action:r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,null,r.a.createElement(de.a,null)),r.a.createElement(x.a,null,r.a.createElement(ye.a,null))),title:"Expense",subheader:this.state.filterDate}),r.a.createElement(me.a,null),r.a.createElement(ie.a,null,this.state.data.map(function(t,a){return t.items.length>0?r.a.createElement("div",{key:a},r.a.createElement(v.a,{variant:"h6"},t.category.name),r.a.createElement("div",{className:e.expenseItem},t.items.map(function(e,t){return r.a.createElement("div",{key:t},r.a.createElement(v.a,{variant:"subtitle1"},e.title,r.a.createElement("span",{style:{float:"right"}},e.amount)),r.a.createElement(me.a,{light:!0}))}))):null})),r.a.createElement(me.a,null),r.a.createElement(oe.a,{className:e.cardFooter},r.a.createElement(v.a,{component:"p"},this.state.total)))}}]),t}(n.Component),be=Object(te.withStyles)({card:{minWidth:275},cardFooter:{float:"right"},expenseItem:{marginLeft:20}})(fe);Object(te.withStyles)({card:{minWidth:275,marginBottom:"10px"},cardFooter:{float:"right"}})(function(e){var t=e.classes;return r.a.createElement(ne.a,{className:t.card},r.a.createElement(ce.a,{action:[r.a.createElement(x.a,{color:"inherit","aria-label":"Menu"},r.a.createElement(de.a,null)),r.a.createElement(x.a,null,r.a.createElement(ye.a,null))],title:"Income",subheader:"January 2019"}),r.a.createElement(me.a,null),r.a.createElement(ie.a,null),r.a.createElement(me.a,null),r.a.createElement(oe.a,{className:t.cardFooter},r.a.createElement(v.a,{component:"p"},"0.00")))});var Ee={fabPrimary:{position:"absolute",bottom:"15px",right:"15px",zIndex:2},fabExpense:{position:"absolute",bottom:"150px",right:"23px",zIndex:2},fabIncome:{position:"absolute",bottom:"90px",right:"23px",zIndex:2},backdrop:{zIndex:1}},ve=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggleMenu=function(){a.setState(Object(p.a)({},a.state,{showMenu:!a.state.showMenu}))},a.newExpense=function(){a.props.history.push("/expense/new")},a.state={showMenu:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(L,{title:"moneytoring",buttons:[]}),this.state.showMenu?r.a.createElement(r.a.Fragment,null,r.a.createElement(J.a,{onClick:this.newExpense,className:"animated jello",color:"secondary",size:"small","aria-label":"expense",style:Ee.fabExpense},r.a.createElement(V.a,null)),r.a.createElement(J.a,{className:"animated jello",color:"default",size:"small","aria-label":"income",style:Ee.fabIncome},r.a.createElement(Y.a,null)),r.a.createElement(Z.a,{onClick:this.toggleMenu,open:!0,style:Ee.backdrop})):null,r.a.createElement(J.a,{onClick:this.toggleMenu,color:"primary","aria-label":"Add",style:Ee.fabPrimary},this.state.showMenu?r.a.createElement(Q.a,null):r.a.createElement(U.a,null)),r.a.createElement("div",{style:{padding:"10px"}},r.a.createElement(be,null)),r.a.createElement("div",{style:{padding:"10px"}}))}}]),t}(n.Component),we=(a(352),a(39)),xe=a(42),je=a.n(xe),Oe=a(86),ke=a.n(Oe),Ie=a(85),Ce=a.n(Ie),De=a(84),Se=a.n(De),Me=a(34),Ne=a.n(Me),Fe=a(35),Be=a.n(Fe),Ae=a(36),Te=a.n(Ae),Pe=a(25),Ye=a.n(Pe),We=a(24),Ve=a.n(We),qe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).changeViewType=function(e){a.setState(Object(p.a)({},a.state,{viewType:e.target.value}))},a.changeStateValue=function(e,t,n){a.setState(Object(p.a)({},a.state,Object(we.a)({},e,Object(p.a)({},a.state[e],Object(we.a)({},t,n.target.value)))))},a.handleApply=function(){var e=new Date,t=new Date,n={daily:!1,weekly:!1,monthly:!1,yearly:!1,from:!1,to:!1},r=!1;switch(a.state.viewType){case"daily":""===a.state.daily.date?(r=!0,n.daily=!0):(e=ee()(a.state.daily.date).hours(0).minutes(0).seconds(0),t=ee()(a.state.daily.date).hours(23).minutes(59).seconds(59));break;case"weekly":if(""===a.state.weekly.week)r=!0,n.weekly=!0;else{var o=a.state.weekly.week.split("-"),l=Number(o[1].replace("W",""));e=ee()().year(Number(o[0])).week(l).startOf("week"),t=ee()().year(Number(o[0])).week(l).endOf("week")}break;case"monthly":if(""===a.state.monthly.month)r=!0,n.monthly=!0;else{var c=a.state.monthly.month.split("-");e=ee()().year(Number(c[0])).month(Number(c[1])-1).startOf("month"),t=ee()().year(Number(c[0])).month(Number(c[1])-1).endOf("month")}break;case"yearly":if(""===a.state.yearly.year||isNaN(a.state.yearly.year))r=!0,n.yearly=!0;else{var s=Number(a.state.yearly.year);e=ee()().year(s).startOf("year"),t=ee()().year(s).endOf("year")}break;default:""===a.state.custom.from?(r=!0,n.from=!0):""===a.state.custom.to?(r=!0,n.to=!0):(e=ee()(a.state.custom.from).hours(0).minutes(0).seconds(0),t=ee()(a.state.custom.to).hours(23).minutes(59).seconds(59))}r?a.setState(Object(p.a)({},a.state,{errors:n})):a.props.applyFilter(e,t)},a.state={viewType:"daily",daily:{date:ee()().format("YYYY-MM-DD")},weekly:{week:""},monthly:{month:""},yearly:{year:""},custom:{from:"",to:""},errors:{daily:!1,weekly:!1,monthly:!1,yearly:!1,from:!1,to:!1}},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Se.a,null,"Filter expense"),r.a.createElement(Ce.a,null,r.a.createElement(Ne.a,{className:"form-control",margin:"normal"},r.a.createElement(Be.a,null,"View"),r.a.createElement(Te.a,{value:this.state.viewType,onChange:this.changeViewType.bind(this)},r.a.createElement(Ye.a,{value:"daily"},r.a.createElement("em",null,"Daily")),r.a.createElement(Ye.a,{value:"weekly"},r.a.createElement("em",null,"Weekly")),r.a.createElement(Ye.a,{value:"monthly"},r.a.createElement("em",null,"Monthly")),r.a.createElement(Ye.a,{value:"yearly"},r.a.createElement("em",null,"Yearly")),r.a.createElement(Ye.a,{value:"custom"},r.a.createElement("em",null,"Custom")))),"daily"===this.state.viewType?r.a.createElement(Ve.a,{error:this.state.errors.daily,ref:"title",label:"Date",value:this.state.daily.date,onChange:this.changeStateValue.bind(this,"daily","date"),margin:"normal",type:"date",className:"form-control"}):null,"weekly"===this.state.viewType?r.a.createElement(Ve.a,{error:this.state.errors.weekly,ref:"title",label:"Week",value:this.state.weekly.week,onChange:this.changeStateValue.bind(this,"weekly","week"),margin:"normal",type:"week",className:"form-control"}):null,"monthly"===this.state.viewType?r.a.createElement(Ve.a,{error:this.state.errors.monthly,ref:"title",label:"Month",value:this.state.monthly.month,onChange:this.changeStateValue.bind(this,"monthly","month"),margin:"normal",type:"month",className:"form-control"}):null,"yearly"===this.state.viewType?r.a.createElement(Ve.a,{error:this.state.errors.yearly,ref:"title",label:"Year",value:this.state.yearly.year,onChange:this.changeStateValue.bind(this,"yearly","year"),margin:"normal",className:"form-control",type:"number"}):null,"custom"===this.state.viewType?r.a.createElement(r.a.Fragment,null,r.a.createElement(Ve.a,{error:this.state.errors.from,ref:"title",label:"From",value:this.state.custom.from,onChange:this.changeStateValue.bind(this,"custom","from"),margin:"normal",type:"date",className:"form-control"}),r.a.createElement(Ve.a,{error:this.state.errors.to,ref:"title",label:"To",value:this.state.custom.to,onChange:this.changeStateValue.bind(this,"custom","to"),margin:"normal",type:"date",className:"form-control"})):null),r.a.createElement(ke.a,null,r.a.createElement(je.a,{onClick:this.props.close,color:"secondary"},"Cancel"),r.a.createElement(je.a,{onClick:this.handleApply.bind(this),color:"primary"},"Apply")))}}]),t}(n.Component),Re=function(e,t,a,n){t=isNaN(t=Math.abs(t))?2:t,a=void 0===a?".":a,n=void 0===n?",":n;var r=e<0?"-":"",o=String(parseInt(e=Math.abs(Number(e)||0).toFixed(t))),l=(l=o.length)>3?l%3:0;return r+(l?o.substr(0,l)+n:"")+o.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+n)+(t?a+Math.abs(e-o).toFixed(t).slice(2):"")},ze=a(154),He=a.n(ze),Le=a(87),Ge=a.n(Le),Je=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggleFilter=function(){a.setState(Object(p.a)({},a.state,{showFilter:!a.state.showFilter}))},a.loadExpenses=function(e,t){e.month()===t.month()&&e.date()===t.date()&&e.year()===t.year()?a.setState(Object(p.a)({},a.state,{expenses:[],currentFilter:e.format("MMM DD"),total:0})):a.setState(Object(p.a)({},a.state,{expenses:[],currentFilter:e.format("MMM DD")+" - "+t.format("MMM DD"),total:0}));var n=null;e&&t&&(n=IDBKeyRange.bound(e.toDate(),t.toDate())),indexedDB.open("Moneytoring").onsuccess=function(e){var t=e.target.result.transaction(["expense"],"readonly"),r=t.objectStore("expense"),o=null===n?r.index("date").openCursor(null,"prev"):r.index("date").openCursor(n,"prev");a.setState(Object(p.a)({},a.state,{showFilter:!1}));var l=[],c=0;o.onsuccess=function(e){var t=e.target.result;t&&(l.push(t.value),c+=t.value.amount,t.continue())},t.oncomplete=function(){a.renderShits(l,c)}}},a.renderShits=function(e,t){a.setState(Object(p.a)({},a.state,{expenses:e,total:t}))},a.state={currentFilter:"",total:0,expenses:[],showFilter:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=ee()().hours(0).minutes(0).seconds(0),t=ee()().hours(23).minutes(59).seconds(59);this.loadExpenses(e,t)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(L,{title:"Expense",buttons:[r.a.createElement(x.a,{onClick:this.toggleFilter,color:"inherit","aria-label":"Menu"},r.a.createElement(He.a,null))]}),r.a.createElement(g.a,{position:"fixed",style:{marginTop:"56px",zIndex:1},color:"default"},r.a.createElement(b.a,null,r.a.createElement(v.a,{style:{display:"block",width:"100%",textAlign:"center"},component:"p"},this.state.currentFilter,r.a.createElement("br",null),r.a.createElement("small",null,Re(this.state.total))))),r.a.createElement("div",{style:{marginTop:"56px",overflowY:"auto",minHeight:"100%"}},r.a.createElement(C.a,{component:"nav"},this.state.expenses.map(function(e){return r.a.createElement(k.a,{key:e.expenseId,style:{textDecoration:"none"},className:"list-item",to:"/expense/edit/"+e.expenseId},r.a.createElement(S.a,{button:!0},r.a.createElement(B.a,{primary:e.title}),r.a.createElement(v.a,{className:"float-right"},Re(e.amount))),r.a.createElement(me.a,{light:!0}))}))),r.a.createElement(Ge.a,{onClose:this.toggleFilter,open:this.state.showFilter},r.a.createElement(qe,{close:this.toggleFilter.bind(this),applyFilter:this.loadExpenses.bind(this)})),r.a.createElement(J.a,{onClick:function(){e.props.history.push("/expense/new")},color:"primary","aria-label":"Add",style:{position:"fixed",bottom:"15px",right:"15px"}},r.a.createElement(U.a,null)))}}]),t}(n.Component),Ke=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Income index"))}}]),t}(n.Component),Ue=a(155),$e=a.n(Ue),Qe={root:{flexGrow:1,paddingTop:56},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}},Xe=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:Qe.root},r.a.createElement(g.a,{position:"fixed"},r.a.createElement(b.a,null,this.props.showBackButton?r.a.createElement(x.a,{onClick:this.props.onBack,style:Qe.menuButton,color:"inherit","aria-label":"Menu"},r.a.createElement($e.a,null)):null,r.a.createElement(v.a,{variant:"h6",color:"inherit",style:Qe.grow},this.props.title),this.props.buttons.map(function(e,t){return r.a.createElement("span",{key:t},e)}))))}}]),t}(n.Component),Ze=a(93),_e=a.n(Ze),et=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadAccounts=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{accounts:n.result}))}}},a.loadCategories=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["category"],"readonly"),n=a.objectStore("category").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{categories:n.result}))}}},a.state={title:"",categoryId:0,amount:"",accountId:1,description:"",date:ee()().format("YYYY-MM-DD[T]HH:mm"),accounts:[],categories:[],errors:{title:!1,category:!1,amount:!1,account:!1,date:!1}},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.loadAccounts(this),this.loadCategories(this)}},{key:"handleChangeProperty",value:function(e,t){var a=t.target.value;"accountId"!==e&&"categoryId"!==e||(a=parseInt(t.target.value)),this.setState(Object(p.a)({},this.state,Object(we.a)({},e,a)))}},{key:"formatCurrency",value:function(e){var t=Re(this.state.amount);this.setState(Object(p.a)({},this.state,{amount:t}))}},{key:"handleSave",value:function(){var e=this,t={title:this.state.title,categoryId:this.state.categoryId,accountId:this.state.accountId,amount:parseFloat(this.state.amount.replace(/,/g,"")),description:this.state.description,date:new Date(this.state.date)},a=!1,n={title:!1,category:!1,amount:!1,account:!1,date:!1};(""===t.title&&(n.title=!0,a=!0),(0===t.amount||isNaN(t.amount))&&(n.amount=!0,a=!0),0===t.accountId&&(n.account=!0,a=!0),0===t.categoryId&&(n.category=!0,a=!0),this.state.date&&""!==this.state.date||(n.date=!0,a=!0),a)?this.setState(Object(p.a)({},this.state,{errors:n})):indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction("expense","readwrite");n.objectStore("expense").put(t),n.oncomplete=function(t){e.props.history.push("/expense")}}}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Xe,{onBack:function(){e.props.history.goBack()},showBackButton:!0,title:"Add expense",buttons:[r.a.createElement(x.a,{onClick:this.handleSave.bind(this),color:"inherit"},r.a.createElement(_e.a,null))]}),r.a.createElement("div",{className:"content"},r.a.createElement(Ne.a,{className:"form-control",margin:"normal"},r.a.createElement(Be.a,null,"Account"),r.a.createElement(Te.a,{error:this.state.errors.account,value:this.state.accountId,onChange:this.handleChangeProperty.bind(this,"accountId")},r.a.createElement(Ye.a,{value:0},r.a.createElement("em",null,"select account")),this.state.accounts.map(function(e){return r.a.createElement(Ye.a,{key:e.accountId,value:e.accountId},e.name)}))),r.a.createElement(Ve.a,{error:this.state.errors.title,label:"Title",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title"),margin:"normal",className:"form-control"}),r.a.createElement(Ve.a,{error:this.state.errors.amount,label:"Amount",value:this.state.amount,onChange:this.handleChangeProperty.bind(this,"amount"),margin:"normal",className:"form-control",onBlur:this.formatCurrency.bind(this)}),r.a.createElement(Ne.a,{className:"form-control",margin:"normal"},r.a.createElement(Be.a,null,"Category"),r.a.createElement(Te.a,{error:this.state.errors.category,value:this.state.categoryId,onChange:this.handleChangeProperty.bind(this,"categoryId")},r.a.createElement(Ye.a,{value:0},r.a.createElement("em",null,"select category")),this.state.categories.map(function(e){return r.a.createElement(Ye.a,{key:e.categoryId,value:e.categoryId},e.name)}))),r.a.createElement(Ve.a,{error:this.state.errors.date,label:"Date",type:"datetime-local",margin:"normal",className:"form-control",value:this.state.date,onChange:this.handleChangeProperty.bind(this,"date")}),r.a.createElement(Ve.a,{className:"form-control",label:"Notes",multiline:!0,rows:"6",value:this.state.description,onChange:this.handleChangeProperty.bind(this,"description"),margin:"normal"})))}}]),t}(n.Component),tt=a(156),at=a.n(tt),nt=a(47),rt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadExpense=function(e,t){indexedDB.open("Moneytoring").onsuccess=function(n){var r=n.target.result.transaction(["expense"],"readonly"),o=r.objectStore("expense").get(e);r.oncomplete=function(e){o.result?t.setState(Object(p.a)({},t.state,{title:o.result.title,categoryId:o.result.categoryId,amount:Re(o.result.amount),accountId:o.result.accountId,description:o.result.description,date:ee()(o.result.date).format("YYYY-MM-DD[T]HH:mm")})):a.props.history.push("/expense")}}},a.loadAccounts=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{accounts:n.result}))}}},a.loadCategories=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["category"],"readonly"),n=a.objectStore("category").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{categories:n.result}))}}},a.handleDelete=function(){indexedDB.open("Moneytoring").onsuccess=function(e){var t=e.target.result.transaction("expense","readwrite");t.objectStore("expense").delete(a.state.expenseId),t.oncomplete=function(e){a.props.history.push("/expense")}}},a.toggleDeleteModal=function(){a.setState(Object(p.a)({},a.state,{showDelete:!a.state.showDelete}))},a.state={showDelete:!1,expenseId:Number(a.props.match.params.id),title:"",categoryId:0,amount:"",accountId:0,date:ee()().format("YYYY-MM-DD[T]HH:mm"),description:"",accounts:[],categories:[],errors:{title:!1,category:!1,amount:!1,account:!1,date:!1}},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.loadAccounts(this),this.loadCategories(this),this.loadExpense(this.state.expenseId,this)}},{key:"handleChangeProperty",value:function(e,t){var a=t.target.value;"accountId"!==e&&"categoryId"!==e||(a=parseInt(t.target.value)),this.setState(Object(p.a)({},this.state,Object(we.a)({},e,a)))}},{key:"formatCurrency",value:function(e){var t=Re(this.state.amount);this.setState(Object(p.a)({},this.state,{amount:t}))}},{key:"handleSave",value:function(){var e=this,t={expenseId:this.state.expenseId,title:this.state.title,categoryId:this.state.categoryId,accountId:this.state.accountId,amount:parseFloat(this.state.amount.replace(/,/g,"")),description:this.state.description,date:new Date(this.state.date)},a=!1,n={title:!1,category:!1,amount:!1,account:!1,date:!1};(""===t.title&&(n.title=!0,a=!0),(0===t.amount||isNaN(t.amount))&&(n.amount=!0,a=!0),0===t.accountId&&(n.account=!0,a=!0),0===t.categoryId&&(n.category=!0,a=!0),this.state.date&&""!==this.state.date||(n.date=!0,a=!0),a)?this.setState(Object(p.a)({},this.state,{errors:n})):indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction("expense","readwrite");n.objectStore("expense").put(t),n.oncomplete=function(t){e.props.history.push("/expense")}}}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Xe,{onBack:function(){e.props.history.goBack()},showBackButton:!0,title:"Add expense",buttons:[r.a.createElement(x.a,{onClick:this.toggleDeleteModal.bind(this),color:"inherit"},r.a.createElement(at.a,null)),r.a.createElement(x.a,{onClick:this.handleSave.bind(this),color:"inherit"},r.a.createElement(_e.a,null))]}),r.a.createElement("div",{className:"content"},r.a.createElement(Ne.a,{className:"form-control",margin:"normal"},r.a.createElement(Be.a,null,"Account"),r.a.createElement(Te.a,{error:this.state.errors.account,value:this.state.accountId,onChange:this.handleChangeProperty.bind(this,"accountId")},r.a.createElement(Ye.a,{value:0},r.a.createElement("em",null,"select account")),this.state.accounts.map(function(e){return r.a.createElement(Ye.a,{key:e.accountId,value:e.accountId},e.name)}))),r.a.createElement(Ve.a,{error:this.state.errors.title,label:"Title",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title"),margin:"normal",className:"form-control"}),r.a.createElement(Ve.a,{error:this.state.errors.amount,label:"Amount",value:this.state.amount,onChange:this.handleChangeProperty.bind(this,"amount"),margin:"normal",className:"form-control",onBlur:this.formatCurrency.bind(this)}),r.a.createElement(Ne.a,{className:"form-control",margin:"normal"},r.a.createElement(Be.a,null,"Category"),r.a.createElement(Te.a,{error:this.state.errors.category,value:this.state.categoryId,onChange:this.handleChangeProperty.bind(this,"categoryId")},r.a.createElement(Ye.a,{value:0},r.a.createElement("em",null,"select category")),this.state.categories.map(function(e){return r.a.createElement(Ye.a,{key:e.categoryId,value:e.categoryId},e.name)}))),r.a.createElement(Ve.a,{error:this.state.errors.date,label:"Date",type:"datetime-local",margin:"normal",className:"form-control",value:this.state.date,onChange:this.handleChangeProperty.bind(this,"date")}),r.a.createElement(Ve.a,{className:"form-control",label:"Notes",multiline:!0,rows:"6",value:this.state.description,onChange:this.handleChangeProperty.bind(this,"description"),margin:"normal"}),r.a.createElement(nt.b,{onClose:this.toggleDeleteModal,open:this.state.showDelete},r.a.createElement(nt.f,null,"Confirm"),r.a.createElement(nt.d,null,r.a.createElement(nt.e,null,"Are you sure you want to delete?")),r.a.createElement(nt.c,null,r.a.createElement(nt.a,{onClick:this.toggleDeleteModal,color:"primary",autoFocus:!0},"Cancel"),r.a.createElement(nt.a,{onClick:this.handleDelete,color:"primary"},"Delete")))))}}]),t}(n.Component),ot=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("main",null,r.a.createElement(h.a,null,r.a.createElement(d.a,{path:"/income",component:Ke}),r.a.createElement(d.a,{path:"/expense/edit/:id",component:rt}),r.a.createElement(d.a,{path:"/expense/new",component:et}),r.a.createElement(d.a,{path:"/expense",component:Je}),r.a.createElement(d.a,{path:"/",component:ve})))}}]),t}(n.Component),lt=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper animate slideInRight"},r.a.createElement(ot,null))}}]),t}(n.Component),ct=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function st(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var it=a(385),ut=a(69),mt=(a(379),a(381),window.matchMedia("(display-mode: standalone)").matches?Object(ut.b)():Object(ut.a)());!function(){var e=window.indexedDB.open("Moneytoring",2);e.onupgradeneeded=function(e){var t=e.target.result;if(t.onerror=function(e){},!t.objectStoreNames.contains("expense")){var a=t.createObjectStore("expense",{keyPath:"expenseId",autoIncrement:!0});a.createIndex("expenseId","expenseId",{unique:!0}),a.createIndex("title","title",{unique:!1}),a.createIndex("categoryId","categoryId",{unique:!1}),a.createIndex("amount","amount",{unique:!1}),a.createIndex("accountId","accountId",{unique:!1}),a.createIndex("description","description",{unique:!1}),a.createIndex("date","date",{unique:!1})}t.objectStoreNames.contains("account")||t.createObjectStore("account",{keyPath:"accountId",autoIncrement:!0}).createIndex("name","name",{unique:!1}),t.objectStoreNames.contains("category")||t.createObjectStore("category",{keyPath:"categoryId",autoIncrement:!0}).createIndex("name","name",{unique:!1})},e.onsuccess=function(e){var t=e.target.result,a=t.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(e){0===n.result.length&&t.transaction(["account"],"readwrite").objectStore("account").put({name:"personal"})};var r=t.transaction(["category"],"readonly"),o=r.objectStore("category").getAll();r.oncomplete=function(e){if(0===o.result.length){var a=t.transaction(["category"],"readwrite").objectStore("category");a.put({name:"food"}),a.put({name:"transportation"}),a.put({name:"clothing"})}}}}(),l.a.render(r.a.createElement(it.a,{history:mt,basename:"/moneytoring"},r.a.createElement(lt,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/moneytoring",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/moneytoring","/service-worker.js");ct?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):st(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):st(t,e)})}}()}},[[220,2,1]]]);
//# sourceMappingURL=main.013d0f1a.chunk.js.map