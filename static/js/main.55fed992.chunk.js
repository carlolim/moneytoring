(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{137:function(e,t,a){e.exports=a(307)},262:function(e,t,a){},301:function(e,t,a){},303:function(e,t,a){},307:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(25),l=a.n(o),s=a(16),c=a(17),i=a(19),u=a(18),m=a(20),h=a(311),d=a(310),p=a(10),y=a(45),g=a.n(y),f=a(46),b=a.n(f),E=a(33),v=a.n(E),w=a(31),j=a.n(w),x=a(128),O=a.n(x),k=a(308),I=a(53),C=a.n(I),S=a(39),D=a.n(S),N=a(72),M=a.n(N),B=a(47),A=a.n(B),F=a(126),P=a.n(F),T=a(67),Y=a.n(T),V=a(66),W=a.n(V),q=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{width:"250px"}},r.a.createElement(C.a,null,r.a.createElement(k.a,{to:"/",style:{textDecoration:"none"}},r.a.createElement(D.a,null,r.a.createElement(M.a,null,r.a.createElement(P.a,null)),r.a.createElement(A.a,{primary:"Dashboard"}))),r.a.createElement(k.a,{to:"/expense",style:{textDecoration:"none"}},r.a.createElement(D.a,null,r.a.createElement(M.a,null,r.a.createElement(W.a,null)),r.a.createElement(A.a,{primary:"Expense"}))),r.a.createElement(k.a,{to:"/income",style:{textDecoration:"none"}},r.a.createElement(D.a,null,r.a.createElement(M.a,null,r.a.createElement(Y.a,null)),r.a.createElement(A.a,{primary:"Income"})))))}}]),t}(n.Component),H=a(127),R=a.n(H),G={root:{flexGrow:1},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}},L=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isOpen:!1},a.toggleDrawer=function(){a.setState({isOpen:!a.state.isOpen})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:G.root},r.a.createElement(R.a,{open:this.state.isOpen,onClose:this.toggleDrawer,onOpen:this.toggleDrawer},r.a.createElement("div",{tabIndex:0,role:"button",onClick:this.toggleDrawer,onKeyDown:this.toggleDrawer},r.a.createElement(q,null))),r.a.createElement(g.a,{position:"fixed"},r.a.createElement(b.a,null,r.a.createElement(j.a,{onClick:this.toggleDrawer,style:G.menuButton,color:"inherit","aria-label":"Menu"},r.a.createElement(O.a,null)),r.a.createElement(v.a,{variant:"h6",color:"inherit",style:G.grow},this.props.title),this.props.buttons.map(function(e,t){return r.a.createElement("span",{key:t},e)}))))}}]),t}(n.Component),$=a(48),z=a.n($),U=a(68),J=a.n(U),K=a(129),Q=a.n(K),X=a(89),Z=a.n(X),_={fabPrimary:{position:"absolute",bottom:"15px",right:"15px"},fabExpense:{position:"absolute",bottom:"150px",right:"23px"},fabIncome:{position:"absolute",bottom:"90px",right:"23px"}},ee=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggleMenu=function(){a.setState(Object(p.a)({},a.state,{showMenu:!a.state.showMenu}))},a.newExpense=function(){a.props.history.push("/expense/new")},a.state={showMenu:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(L,{title:"moneytoring",buttons:[]}),this.state.showMenu?r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,{onClick:this.newExpense,className:"animated jello",color:"default",size:"small","aria-label":"expense",style:_.fabExpense},r.a.createElement(W.a,null)),r.a.createElement(z.a,{className:"animated jello",color:"default",size:"small","aria-label":"income",style:_.fabIncome},r.a.createElement(Y.a,null)),r.a.createElement(Z.a,{onClick:this.toggleMenu,open:!0})):null,r.a.createElement(z.a,{onClick:this.toggleMenu,color:"primary","aria-label":"Add",style:_.fabPrimary},this.state.showMenu?r.a.createElement(Q.a,null):r.a.createElement(J.a,null)))}}]),t}(n.Component),te=(a(262),a(28)),ae=a(21),ne=a.n(ae),re=a(69),oe=a.n(re),le=a(132),se=a.n(le),ce=a(131),ie=a.n(ce),ue=a(130),me=a.n(ue),he=a(34),de=a.n(he),pe=a(35),ye=a.n(pe),ge=a(36),fe=a.n(ge),be=a(24),Ee=a.n(be),ve=a(23),we=a.n(ve),je=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).changeViewType=function(e){a.setState(Object(p.a)({},a.state,{viewType:e.target.value}))},a.changeStateValue=function(e,t,n){a.setState(Object(p.a)({},a.state,Object(te.a)({},e,Object(p.a)({},a.state[e],Object(te.a)({},t,n.target.value)))))},a.handleApply=function(){var e=new Date,t=new Date,n={daily:!1,weekly:!1,monthly:!1,yearly:!1,from:!1,to:!1},r=!1;switch(a.state.viewType){case"daily":""===a.state.daily.date?(r=!0,n.daily=!0):(e=ne()(a.state.daily.date).hours(0).minutes(0).seconds(0),t=ne()(a.state.daily.date).hours(23).minutes(59).seconds(59));break;case"weekly":if(""===a.state.weekly.week)r=!0,n.weekly=!0;else{var o=a.state.weekly.week.split("-"),l=Number(o[1].replace("W",""));e=ne()().year(Number(o[0])).week(l).startOf("week"),t=ne()().year(Number(o[0])).week(l).endOf("week")}break;case"monthly":if(""===a.state.monthly.month)r=!0,n.monthly=!0;else{var s=a.state.monthly.month.split("-");e=ne()().year(Number(s[0])).month(Number(s[1])-1).startOf("month"),t=ne()().year(Number(s[0])).month(Number(s[1])-1).endOf("month")}break;case"yearly":if(""===a.state.yearly.year||isNaN(a.state.yearly.year))r=!0,n.yearly=!0;else{var c=Number(a.state.yearly.year);e=ne()().year(c).startOf("year"),t=ne()().year(c).endOf("year")}break;default:""===a.state.custom.from?(r=!0,n.from=!0):""===a.state.custom.to?(r=!0,n.to=!0):(e=ne()(a.state.custom.from).hours(0).minutes(0).seconds(0),t=ne()(a.state.custom.to).hours(23).minutes(59).seconds(59))}r?a.setState(Object(p.a)({},a.state,{errors:n})):a.props.applyFilter(e,t)},a.state={viewType:"daily",daily:{date:ne()().format("YYYY-MM-DD")},weekly:{week:""},monthly:{month:""},yearly:{year:""},custom:{from:"",to:""},errors:{daily:!1,weekly:!1,monthly:!1,yearly:!1,from:!1,to:!1}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(me.a,null,"Filter expense"),r.a.createElement(ie.a,null,r.a.createElement(de.a,{className:"form-control",margin:"normal"},r.a.createElement(ye.a,null,"View"),r.a.createElement(fe.a,{value:this.state.viewType,onChange:this.changeViewType.bind(this)},r.a.createElement(Ee.a,{value:"daily"},r.a.createElement("em",null,"Daily")),r.a.createElement(Ee.a,{value:"weekly"},r.a.createElement("em",null,"Weekly")),r.a.createElement(Ee.a,{value:"monthly"},r.a.createElement("em",null,"Monthly")),r.a.createElement(Ee.a,{value:"yearly"},r.a.createElement("em",null,"Yearly")),r.a.createElement(Ee.a,{value:"custom"},r.a.createElement("em",null,"Custom")))),"daily"===this.state.viewType?r.a.createElement(we.a,{error:this.state.errors.daily,ref:"title",label:"Date",value:this.state.daily.date,onChange:this.changeStateValue.bind(this,"daily","date"),margin:"normal",type:"date",className:"form-control"}):null,"weekly"===this.state.viewType?r.a.createElement(we.a,{error:this.state.errors.weekly,ref:"title",label:"Week",value:this.state.weekly.week,onChange:this.changeStateValue.bind(this,"weekly","week"),margin:"normal",type:"week",className:"form-control"}):null,"monthly"===this.state.viewType?r.a.createElement(we.a,{error:this.state.errors.monthly,ref:"title",label:"Month",value:this.state.monthly.month,onChange:this.changeStateValue.bind(this,"monthly","month"),margin:"normal",type:"month",className:"form-control"}):null,"yearly"===this.state.viewType?r.a.createElement(we.a,{error:this.state.errors.yearly,ref:"title",label:"Year",value:this.state.yearly.year,onChange:this.changeStateValue.bind(this,"yearly","year"),margin:"normal",className:"form-control",type:"number"}):null,"custom"===this.state.viewType?r.a.createElement(r.a.Fragment,null,r.a.createElement(we.a,{error:this.state.errors.from,ref:"title",label:"From",value:this.state.custom.from,onChange:this.changeStateValue.bind(this,"custom","from"),margin:"normal",type:"date",className:"form-control"}),r.a.createElement(we.a,{error:this.state.errors.to,ref:"title",label:"To",value:this.state.custom.to,onChange:this.changeStateValue.bind(this,"custom","to"),margin:"normal",type:"date",className:"form-control"})):null),r.a.createElement(se.a,null,r.a.createElement(oe.a,{onClick:this.props.close,color:"secondary"},"Cancel"),r.a.createElement(oe.a,{onClick:this.handleApply.bind(this),color:"primary"},"Apply")))}}]),t}(n.Component),xe=function(e,t,a,n){t=isNaN(t=Math.abs(t))?2:t,a=void 0===a?".":a,n=void 0===n?",":n;var r=e<0?"-":"",o=String(parseInt(e=Math.abs(Number(e)||0).toFixed(t))),l=(l=o.length)>3?l%3:0;return r+(l?o.substr(0,l)+n:"")+o.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+n)+(t?a+Math.abs(e-o).toFixed(t).slice(2):"")},Oe=a(133),ke=a.n(Oe),Ie=a(134),Ce=a.n(Ie),Se=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggleFilter=function(){a.setState(Object(p.a)({},a.state,{showFilter:!a.state.showFilter}))},a.loadExpenses=function(e,t){e.month()===t.month()&&e.date()===t.date()&&e.year()===t.year()?a.setState(Object(p.a)({},a.state,{expenses:[],currentFilter:e.format("MMM DD"),total:0})):a.setState(Object(p.a)({},a.state,{expenses:[],currentFilter:e.format("MMM DD")+" - "+t.format("MMM DD"),total:0}));var n=null;e&&t&&(n=IDBKeyRange.bound(e.toDate(),t.toDate())),indexedDB.open("Moneytoring").onsuccess=function(e){var t=e.target.result.transaction(["expense"],"readonly"),r=t.objectStore("expense"),o=null===n?r.index("date").openCursor(null,"prev"):r.index("date").openCursor(n,"prev");a.setState(Object(p.a)({},a.state,{showFilter:!1}));var l=[],s=0;o.onsuccess=function(e){var t=e.target.result;t&&(l.push(t.value),s+=t.value.amount,t.continue())},t.oncomplete=function(){a.renderShits(l,s)}}},a.renderShits=function(e,t){console.log(e,t),a.setState(Object(p.a)({},a.state,{expenses:e,total:t}))},a.state={currentFilter:"",total:0,expenses:[],showFilter:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=ne()().hours(0).minutes(0).seconds(0),t=ne()().hours(23).minutes(59).seconds(59);this.loadExpenses(e,t)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(L,{title:"Expense",buttons:[r.a.createElement(j.a,{onClick:this.toggleFilter,color:"inherit","aria-label":"Menu"},r.a.createElement(ke.a,null))]}),r.a.createElement(g.a,{position:"fixed",style:{marginTop:"56px",zIndex:1},color:"default"},r.a.createElement(b.a,null,r.a.createElement(v.a,{style:{display:"block",width:"100%",textAlign:"center"},component:"p"},this.state.currentFilter,r.a.createElement("br",null),r.a.createElement("small",null,xe(this.state.total))))),r.a.createElement("div",{style:{marginTop:"112px",overflowY:"scroll",minHeight:"100%"}},r.a.createElement(C.a,{component:"nav"},this.state.expenses.map(function(e){return r.a.createElement(k.a,{key:e.expenseId,style:{textDecoration:"none"},className:"list-item",to:"/expense/edit/"+e.expenseId},r.a.createElement(D.a,{button:!0},r.a.createElement(A.a,{primary:e.title}),r.a.createElement(v.a,{className:"float-right"},xe(e.amount))))}))),r.a.createElement(Ce.a,{onClose:this.toggleFilter,open:this.state.showFilter},r.a.createElement(je,{close:this.toggleFilter.bind(this),applyFilter:this.loadExpenses.bind(this)})),r.a.createElement(z.a,{onClick:function(){e.props.history.push("/expense/new")},color:"primary","aria-label":"Add",style:{position:"fixed",bottom:"15px",right:"15px"}},r.a.createElement(J.a,null)))}}]),t}(n.Component),De=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Income index"))}}]),t}(n.Component),Ne=a(135),Me=a.n(Ne),Be={root:{flexGrow:1},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}},Ae=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:Be.root},r.a.createElement(g.a,{position:"fixed"},r.a.createElement(b.a,null,this.props.showBackButton?r.a.createElement(j.a,{onClick:this.props.onBack,style:Be.menuButton,color:"inherit","aria-label":"Menu"},r.a.createElement(Me.a,null)):null,r.a.createElement(v.a,{variant:"h6",color:"inherit",style:Be.grow},this.props.title),this.props.buttons.map(function(e,t){return r.a.createElement("span",{key:t},e)}))))}}]),t}(n.Component),Fe=a(70),Pe=a.n(Fe),Te=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadAccounts=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{accounts:n.result}))}}},a.loadCategories=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["category"],"readonly"),n=a.objectStore("category").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{categories:n.result}))}}},a.state={title:"",categoryId:0,amount:"",accountId:1,description:"",date:ne()().format("YYYY-MM-DD[T]HH:mm"),accounts:[],categories:[],errors:{title:!1,category:!1,amount:!1,account:!1,date:!1}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.loadAccounts(this),this.loadCategories(this)}},{key:"handleChangeProperty",value:function(e,t){var a=t.target.value;"accountId"!==e&&"categoryId"!==e||(a=parseInt(t.target.value)),this.setState(Object(p.a)({},this.state,Object(te.a)({},e,a)))}},{key:"formatCurrency",value:function(e){var t=xe(this.state.amount);this.setState(Object(p.a)({},this.state,{amount:t}))}},{key:"handleSave",value:function(){var e=this,t={title:this.state.title,categoryId:this.state.categoryId,accountId:this.state.accountId,amount:parseFloat(this.state.amount.replace(/,/g,"")),description:this.state.description,date:new Date(this.state.date)},a=!1,n={title:!1,category:!1,amount:!1,account:!1,date:!1};(""===t.title&&(n.title=!0,a=!0),(0===t.amount||isNaN(t.amount))&&(n.amount=!0,a=!0),0===t.accountId&&(n.account=!0,a=!0),0===t.categoryId&&(n.category=!0,a=!0),this.state.date&&""!==this.state.date||(n.date=!0,a=!0),a)?this.setState(Object(p.a)({},this.state,{errors:n})):indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction("expense","readwrite");n.objectStore("expense").put(t),n.oncomplete=function(t){e.props.history.push("/expense")}}}},{key:"render",value:function(){var e,t=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ae,{onBack:function(){t.props.history.goBack()},showBackButton:!0,title:"Add expense",buttons:[r.a.createElement(j.a,{onClick:this.handleSave.bind(this),color:"inherit"},r.a.createElement(Pe.a,null))]}),r.a.createElement("div",{className:"content",style:{marginTop:"56px"}},r.a.createElement(de.a,{className:"form-control",margin:"normal"},r.a.createElement(ye.a,null,"Account"),r.a.createElement(fe.a,{ref:"account",error:this.state.errors.account,value:this.state.accountId,onChange:this.handleChangeProperty.bind(this,"accountId")},r.a.createElement(Ee.a,{value:0},r.a.createElement("em",null,"select account")),this.state.accounts.map(function(e){return r.a.createElement(Ee.a,{key:e.accountId,value:e.accountId},e.name)}))),r.a.createElement(we.a,{ref:"title",error:this.state.errors.title,label:"Title",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title"),margin:"normal",className:"form-control"}),r.a.createElement(we.a,{ref:"amount",error:this.state.errors.amount,label:"Amount",value:this.state.amount,onChange:this.handleChangeProperty.bind(this,"amount"),margin:"normal",className:"form-control",onBlur:this.formatCurrency.bind(this)}),r.a.createElement(de.a,{className:"form-control",margin:"normal"},r.a.createElement(ye.a,null,"Category"),r.a.createElement(fe.a,{ref:"category",error:this.state.errors.category,value:this.state.categoryId,onChange:this.handleChangeProperty.bind(this,"categoryId")},r.a.createElement(Ee.a,{value:0},r.a.createElement("em",null,"select category")),this.state.categories.map(function(e){return r.a.createElement(Ee.a,{key:e.categoryId,value:e.categoryId},e.name)}))),r.a.createElement(we.a,(e={ref:"date",error:this.state.errors.date,label:"Date",type:"datetime-local",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title"),margin:"normal",className:"form-control"},Object(te.a)(e,"value",this.state.date),Object(te.a)(e,"onChange",this.handleChangeProperty.bind(this,"date")),e)),r.a.createElement(we.a,{className:"form-control",label:"Notes",multiline:!0,rows:"6",value:this.state.description,onChange:this.handleChangeProperty.bind(this,"description"),margin:"normal"})))}}]),t}(n.Component),Ye=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadExpense=function(e,t){indexedDB.open("Moneytoring").onsuccess=function(n){var r=n.target.result.transaction(["expense"],"readonly"),o=r.objectStore("expense").get(e);r.oncomplete=function(e){o.result?t.setState(Object(p.a)({},t.state,{title:o.result.title,categoryId:o.result.categoryId,amount:xe(o.result.amount),accountId:o.result.accountId,description:o.result.description,date:ne()(o.result.date).format("YYYY-MM-DD[T]HH:mm")})):a.props.history.push("/expense")}}},a.loadAccounts=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{accounts:n.result}))}}},a.loadCategories=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["category"],"readonly"),n=a.objectStore("category").getAll();a.oncomplete=function(t){e.setState(Object(p.a)({},e.state,{categories:n.result}))}}},a.handleDelete=function(){indexedDB.open("Moneytoring").onsuccess=function(e){var t=e.target.result.transaction("expense","readwrite");t.objectStore("expense").delete(a.state.expenseId),console.log(1),t.oncomplete=function(e){window.$("#modalDanger").on("hidden.bs.modal",function(){a.props.history.push("/expense")}),window.$("#modalDanger").modal("hide")}}},a.state={expenseId:Number(a.props.match.params.id),title:"",categoryId:0,amount:"",accountId:0,date:ne()().format("YYYY-MM-DD[T]HH:mm"),description:"",accounts:[],categories:[],errors:{title:!1,category:!1,amount:!1,account:!1,date:!1}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.loadAccounts(this),this.loadCategories(this),this.loadExpense(this.state.expenseId,this)}},{key:"handleChangeProperty",value:function(e,t){var a=t.target.value;"accountId"!==e&&"categoryId"!==e||(a=parseInt(t.target.value)),this.setState(Object(p.a)({},this.state,Object(te.a)({},e,a)))}},{key:"formatCurrency",value:function(e){var t=xe(this.state.amount);this.setState(Object(p.a)({},this.state,{amount:t}))}},{key:"handleSave",value:function(){var e=this,t={expenseId:this.state.expenseId,title:this.state.title,categoryId:this.state.categoryId,accountId:this.state.accountId,amount:parseFloat(this.state.amount.replace(/,/g,"")),description:this.state.description,date:new Date(this.state.date)},a=!1,n={title:!1,category:!1,amount:!1,account:!1,date:!1};(""===t.title&&(n.title=!0,a=!0),(0===t.amount||isNaN(t.amount))&&(n.amount=!0,a=!0),0===t.accountId&&(n.account=!0,a=!0),0===t.categoryId&&(n.category=!0,a=!0),this.state.date&&""!==this.state.date||(n.date=!0,a=!0),a)?this.setState(Object(p.a)({},this.state,{errors:n})):indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction("expense","readwrite");n.objectStore("expense").put(t),n.oncomplete=function(t){e.props.history.push("/expense")}}}},{key:"render",value:function(){var e,t=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ae,{onBack:function(){t.props.history.goBack()},showBackButton:!0,title:"Add expense",buttons:[r.a.createElement(j.a,{onClick:this.handleSave.bind(this),color:"inherit"},r.a.createElement(Pe.a,null))]}),r.a.createElement("div",{className:"content",style:{marginTop:"56px"}},r.a.createElement(de.a,{className:"form-control",margin:"normal"},r.a.createElement(ye.a,null,"Account"),r.a.createElement(fe.a,{ref:"account",error:this.state.errors.account,value:this.state.accountId,onChange:this.handleChangeProperty.bind(this,"accountId")},r.a.createElement(Ee.a,{value:0},r.a.createElement("em",null,"select account")),this.state.accounts.map(function(e){return r.a.createElement(Ee.a,{key:e.accountId,value:e.accountId},e.name)}))),r.a.createElement(we.a,{ref:"title",error:this.state.errors.title,label:"Title",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title"),margin:"normal",className:"form-control"}),r.a.createElement(we.a,{ref:"amount",error:this.state.errors.amount,label:"Amount",value:this.state.amount,onChange:this.handleChangeProperty.bind(this,"amount"),margin:"normal",className:"form-control",onBlur:this.formatCurrency.bind(this)}),r.a.createElement(de.a,{className:"form-control",margin:"normal"},r.a.createElement(ye.a,null,"Category"),r.a.createElement(fe.a,{ref:"category",error:this.state.errors.category,value:this.state.categoryId,onChange:this.handleChangeProperty.bind(this,"categoryId")},r.a.createElement(Ee.a,{value:0},r.a.createElement("em",null,"select category")),this.state.categories.map(function(e){return r.a.createElement(Ee.a,{key:e.categoryId,value:e.categoryId},e.name)}))),r.a.createElement(we.a,(e={ref:"date",error:this.state.errors.date,label:"Date",type:"datetime-local",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title"),margin:"normal",className:"form-control"},Object(te.a)(e,"value",this.state.date),Object(te.a)(e,"onChange",this.handleChangeProperty.bind(this,"date")),e)),r.a.createElement(we.a,{className:"form-control",label:"Notes",multiline:!0,rows:"6",value:this.state.description,onChange:this.handleChangeProperty.bind(this,"description"),margin:"normal"})))}}]),t}(n.Component),Ve=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("main",null,r.a.createElement(h.a,null,r.a.createElement(d.a,{path:"/income",component:De}),r.a.createElement(d.a,{path:"/expense/edit/:id",component:Ye}),r.a.createElement(d.a,{path:"/expense/new",component:Te}),r.a.createElement(d.a,{path:"/expense",component:Se}),r.a.createElement(d.a,{path:"/",component:ee})))}}]),t}(n.Component),We=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper animate slideInRight"},r.a.createElement(Ve,null))}}]),t}(n.Component),qe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function He(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var Re=a(309),Ge=a(54),Le=(a(301),a(303),a(305),window.matchMedia("(display-mode: standalone)").matches?Object(Ge.b)():Object(Ge.a)());!function(){var e=window.indexedDB.open("Moneytoring",2);e.onupgradeneeded=function(e){var t=e.target.result;if(t.onerror=function(e){},!t.objectStoreNames.contains("expense")){var a=t.createObjectStore("expense",{keyPath:"expenseId",autoIncrement:!0});a.createIndex("expenseId","expenseId",{unique:!0}),a.createIndex("title","title",{unique:!1}),a.createIndex("categoryId","categoryId",{unique:!1}),a.createIndex("amount","amount",{unique:!1}),a.createIndex("accountId","accountId",{unique:!1}),a.createIndex("description","description",{unique:!1}),a.createIndex("date","date",{unique:!1})}t.objectStoreNames.contains("account")||t.createObjectStore("account",{keyPath:"accountId",autoIncrement:!0}).createIndex("name","name",{unique:!1}),t.objectStoreNames.contains("category")||t.createObjectStore("category",{keyPath:"categoryId",autoIncrement:!0}).createIndex("name","name",{unique:!1})},e.onsuccess=function(e){var t=e.target.result,a=t.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(e){0===n.result.length&&t.transaction(["account"],"readwrite").objectStore("account").put({name:"personal"})};var r=t.transaction(["category"],"readonly"),o=r.objectStore("category").getAll();r.oncomplete=function(e){if(0===o.result.length){var a=t.transaction(["category"],"readwrite").objectStore("category");a.put({name:"food"}),a.put({name:"transportation"}),a.put({name:"clothing"})}}}}(),l.a.render(r.a.createElement(Re.a,{history:Le,basename:"/moneytoring"},r.a.createElement(We,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/moneytoring",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/moneytoring","/service-worker.js");qe?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):He(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):He(t,e)})}}()}},[[137,2,1]]]);
//# sourceMappingURL=main.55fed992.chunk.js.map