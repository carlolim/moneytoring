(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(39)},28:function(e,t,a){},34:function(e,t,a){},36:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(18),c=a.n(r),s=a(2),l=a(3),i=a(5),u=a(4),m=a(6),d=(a(28),a(44)),h=a(41),p=a(43),f=Object(p.a)(function(e){var t=e.history;return o.a.createElement("button",{onClick:function(){t.goBack()}},o.a.createElement("i",{className:"fas fa-arrow-left"}))}),y=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).handleNavToggle=function(){window.toggleNavigation()},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light"},this.props.showBackButton?o.a.createElement(f,null):o.a.createElement("button",{type:"button",id:"sidebarCollapse",className:"btn",onClick:this.handleNavToggle.bind(this)},o.a.createElement("i",{className:"fas fa-bars"})),o.a.createElement("div",{className:"mr-auto"},this.props.title),this.props.buttons?this.props.buttons.map(function(e,t){return o.a.createElement("span",{key:t},e)}):null)}}]),t}(n.Component),v=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(y,{title:"moneytoring"}),o.a.createElement("div",{className:"content"},o.a.createElement("h1",null,"Dashboard index")))}}]),t}(n.Component),g=a(21),b=a(7),E=(a(34),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("button",{onClick:this.props.callback,className:"btn btn-primary btn-lg floating-action-button"},o.a.createElement("i",{className:"fas fa-plus"}))}}]),t}(n.Component)),N=a(40),j=(a(36),a(12)),w=a(9),O=a.n(w),x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).changeViewType=function(e){a.setState(Object(b.a)({},a.state,{viewType:e.target.value}))},a.changeStateValue=function(e,t,n){a.setState(Object(b.a)({},a.state,Object(j.a)({},e,Object(b.a)({},a.state[e],Object(j.a)({},t,n.target.value)))))},a.handleApply=function(){var e=new Date,t=new Date;switch(a.state.viewType){case"daily":if(""===a.state.daily.date)return void alert("Select date");e=O()(a.state.daily.date).hours(0).minutes(0).seconds(0),t=O()(a.state.daily.date).hours(23).minutes(59).seconds(59);break;case"weekly":if(""===a.state.weekly.week)return void alert("Select week");var n=a.state.weekly.week.split("-"),o=Number(n[1].replace("W",""));e=O()().year(Number(n[0])).week(o).startOf("week"),t=O()().year(Number(n[0])).week(o).endOf("week");break;case"monthly":if(""===a.state.monthly.month)return void alert("Select month");var r=a.state.monthly.month.split("-");e=O()().year(Number(r[0])).month(Number(r[1])-1).startOf("month"),t=O()().year(Number(r[0])).month(Number(r[1])-1).endOf("month");break;case"yearly":if(""===a.state.yearly.year||isNaN(a.state.yearly.year))return void alert("Select year");var c=Number(a.state.yearly.year);e=O()().year(c).startOf("year"),t=O()().year(c).endOf("year");break;default:if(""===a.state.custom.from)return void alert("Select date from");if(""===a.state.custom.to)return void alert("Selecte date to");e=O()(a.state.custom.from).hours(0).minutes(0).seconds(0),t=O()(a.state.custom.to).hours(23).minutes(59).seconds(59)}a.props.applyFilter(e,t),window.$("#modalFilterExpense").modal("hide")},a.state={viewType:"daily",daily:{date:O()().format("YYYY-MM-DD")},weekly:{week:""},monthly:{month:""},yearly:{year:""},custom:{from:"",to:""}},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"modal",id:"modalFilterExpense",tabIndex:"-1",role:"dialog"},o.a.createElement("div",{className:"modal-dialog",role:"document"},o.a.createElement("div",{className:"modal-content"},o.a.createElement("div",{className:"modal-header"},o.a.createElement("h5",{className:"modal-title"},"Filter expenses")),o.a.createElement("div",{className:"modal-body"},o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"View"),o.a.createElement("select",{value:this.state.viewType,onChange:this.changeViewType.bind(this),className:"form-control"},o.a.createElement("option",{value:"daily"},"Daily"),o.a.createElement("option",{value:"weekly"},"Weekly"),o.a.createElement("option",{value:"monthly"},"Monthly"),o.a.createElement("option",{value:"yearly"},"Yearly"),o.a.createElement("option",{value:"custom"},"Custom range"))),"daily"===this.state.viewType?o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Date"),o.a.createElement("input",{type:"date",className:"form-control",value:this.state.daily.date,onChange:this.changeStateValue.bind(this,"daily","date")})):null,"weekly"===this.state.viewType?o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Week"),o.a.createElement("input",{type:"week",className:"form-control",value:this.state.weekly.week,onChange:this.changeStateValue.bind(this,"weekly","week")})):null,"monthly"===this.state.viewType?o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Month"),o.a.createElement("input",{type:"month",className:"form-control",value:this.state.monthly.month,onChange:this.changeStateValue.bind(this,"monthly","month")})):null,"yearly"===this.state.viewType?o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Year"),o.a.createElement("input",{type:"year",className:"form-control",value:this.state.yearly.year,onChange:this.changeStateValue.bind(this,"yearly","year")})):null,"custom"===this.state.viewType?o.a.createElement("div",null,o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"From"),o.a.createElement("input",{type:"date",className:"form-control",value:this.state.custom.from,onChange:this.changeStateValue.bind(this,"custom","from")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"To"),o.a.createElement("input",{type:"date",className:"form-control",value:this.state.custom.to,onChange:this.changeStateValue.bind(this,"custom","to")}))):null),o.a.createElement("div",{className:"modal-footer"},o.a.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Cancel"),o.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:this.handleApply.bind(this)},"Apply")))))}}]),t}(n.Component),k=Object(p.a)(function(e){var t=e.history;return o.a.createElement(E,{callback:function(){t.push("/expense/new")}})}),I=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadExpenses=function(e,t){a.setState(Object(b.a)({},a.state,{expenses:[]}));var n=null;e&&t&&(n=IDBKeyRange.bound(e.toDate(),t.toDate())),indexedDB.open("Moneytoring").onsuccess=function(e){var t=e.target.result.transaction(["expense"],"readonly").objectStore("expense");(null===n?t.index("date").openCursor(null,"prev"):t.index("date").openCursor(n,"prev")).onsuccess=function(e){var t=e.target.result;t&&(a.setState(Object(b.a)({},a.state,{expenses:[].concat(Object(g.a)(a.state.expenses),[t.value])})),t.continue())}}},a.state={expenses:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.loadExpenses()}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(y,{title:"Expense",buttons:[o.a.createElement("button",{"data-toggle":"modal","data-target":"#modalFilterExpense"},o.a.createElement("i",{className:"fas fa-filter"}))]}),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"expenses-holder"},this.state.expenses.map(function(e){return o.a.createElement(N.a,{key:e.expenseId,className:"list-item d-block",to:"/expense/edit/"+e.expenseId},e.title,o.a.createElement("small",{className:"float-right"},window.formatMoney(e.amount)))}),0===this.state.expenses.length?o.a.createElement("p",{className:"text-center mt-5"},"Wow! no expenses!"):null,o.a.createElement(k,null))),o.a.createElement(x,{applyFilter:this.loadExpenses.bind(this)}))}}]),t}(n.Component),C=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Income index"))}}]),t}(n.Component),S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadAccounts=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(t){e.setState(Object(b.a)({},e.state,{accounts:n.result}))}}},a.loadCategories=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["category"],"readonly"),n=a.objectStore("category").getAll();a.oncomplete=function(t){e.setState(Object(b.a)({},e.state,{categories:n.result}))}}},a.state={title:"",categoryId:0,amount:"",accountId:0,description:"",date:O()().format("YYYY-MM-DD[T]HH:mm"),accounts:[],categories:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.loadAccounts(this),this.loadCategories(this)}},{key:"handleChangeProperty",value:function(e,t){var a=t.target.value;"accountId"!==e&&"categoryId"!==e||(a=parseInt(t.target.value)),this.setState(Object(b.a)({},this.state,Object(j.a)({},e,a)))}},{key:"formatCurrency",value:function(e){var t=window.formatMoney(this.state.amount);this.setState(Object(b.a)({},this.state,{amount:t}))}},{key:"handleSave",value:function(){var e=this,t={title:this.state.title,categoryId:this.state.categoryId,accountId:this.state.accountId,amount:parseFloat(this.state.amount.replace(/,/g,"")),description:this.state.description,date:new Date(this.state.date)};return""===t.title?(alert("Title is required"),void this.refs.title.focus()):0===t.amount||isNaN(t.amount)?(alert("Amount is required"),void this.refs.amount.focus()):0===t.accountId?(alert("Select account"),void this.refs.account.focus()):this.state.date&&""!==this.state.date?void(indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction("expense","readwrite");n.objectStore("expense").put(t),n.oncomplete=function(t){e.props.history.push("/expense")}}):(alert("Date is required"),void this.refs.date.focus())}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(y,{showBackButton:!0,title:"Add expense",buttons:[o.a.createElement("button",{onClick:this.handleSave.bind(this)},o.a.createElement("i",{className:"fas fa-save"}))]}),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"p-3"},o.a.createElement("div",{className:"form-group"},o.a.createElement("select",{ref:"account",className:"form-control",value:this.state.accountId,onChange:this.handleChangeProperty.bind(this,"accountId")},o.a.createElement("option",null,"-select account-"),this.state.accounts.map(function(e){return o.a.createElement("option",{key:e.accountId,value:e.accountId},e.name)}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{placeholder:"Title",type:"text",ref:"title",className:"form-control",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{placeholder:"Amount",onBlur:this.formatCurrency.bind(this),ref:"amount",type:"text",className:"form-control text-right",value:this.state.amount,onChange:this.handleChangeProperty.bind(this,"amount")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("select",{className:"form-control",value:this.state.categoryId,onChange:this.handleChangeProperty.bind(this,"categoryId")},o.a.createElement("option",null,"-select category-"),this.state.categories.map(function(e){return o.a.createElement("option",{key:e.categoryId,value:e.categoryId},e.name)}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{placeholder:"Date",type:"datetime-local",ref:"date",className:"form-control",value:this.state.date,onChange:this.handleChangeProperty.bind(this,"date")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("textarea",{placeholder:"Description",rows:"5",className:"form-control",value:this.state.description,onChange:this.handleChangeProperty.bind(this,"description")})))))}}]),t}(n.Component),D=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).loadExpense=function(e,t){indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction(["expense"],"readonly"),o=n.objectStore("expense").get(e);n.oncomplete=function(e){t.setState(Object(b.a)({},t.state,{title:o.result.title,categoryId:o.result.categoryId,amount:window.formatMoney(o.result.amount),accountId:o.result.accountId,description:o.result.description,date:O()(o.result.date).format("YYYY-MM-DD[T]HH:mm")}))}}},a.loadAccounts=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(t){e.setState(Object(b.a)({},e.state,{accounts:n.result}))}}},a.loadCategories=function(e){indexedDB.open("Moneytoring").onsuccess=function(t){var a=t.target.result.transaction(["category"],"readonly"),n=a.objectStore("category").getAll();a.oncomplete=function(t){e.setState(Object(b.a)({},e.state,{categories:n.result}))}}},a.state={expenseId:Number(a.props.match.params.id),title:"",categoryId:0,amount:"",accountId:0,date:O()().format("YYYY-MM-DD[T]HH:mm"),description:"",accounts:[],categories:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.loadAccounts(this),this.loadCategories(this),this.loadExpense(this.state.expenseId,this)}},{key:"handleChangeProperty",value:function(e,t){var a=t.target.value;"accountId"!==e&&"categoryId"!==e||(a=parseInt(t.target.value)),this.setState(Object(b.a)({},this.state,Object(j.a)({},e,a)))}},{key:"formatCurrency",value:function(e){var t=window.formatMoney(this.state.amount);this.setState(Object(b.a)({},this.state,{amount:t}))}},{key:"handleSave",value:function(){var e=this,t={expenseId:this.state.expenseId,title:this.state.title,categoryId:this.state.categoryId,accountId:this.state.accountId,amount:parseFloat(this.state.amount.replace(/,/g,"")),description:this.state.description,date:new Date(this.state.date)};return console.log(t),""===t.title?(alert("Title is required"),void this.refs.title.focus()):0===t.amount||isNaN(t.amount)?(alert("Amount is required"),void this.refs.amount.focus()):0===t.accountId?(alert("Select account"),void this.refs.account.focus()):this.state.date&&""!==this.state.date?void(indexedDB.open("Moneytoring").onsuccess=function(a){var n=a.target.result.transaction("expense","readwrite");n.objectStore("expense").put(t),n.oncomplete=function(t){e.props.history.push("/expense")}}):(alert("Date is required"),void this.refs.date.focus())}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(y,{showBackButton:!0,title:"Edit expense",buttons:[o.a.createElement("button",{onClick:this.handleSave.bind(this)},o.a.createElement("i",{className:"fas fa-save"}))]}),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"p-3"},o.a.createElement("div",{className:"form-group"},o.a.createElement("select",{ref:"account",className:"form-control",value:this.state.accountId,onChange:this.handleChangeProperty.bind(this,"accountId")},o.a.createElement("option",null,"-select account-"),this.state.accounts.map(function(e){return o.a.createElement("option",{key:e.accountId,value:e.accountId},e.name)}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{placeholder:"Title",type:"text",ref:"title",className:"form-control",value:this.state.title,onChange:this.handleChangeProperty.bind(this,"title")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{placeholder:"Amount",onBlur:this.formatCurrency.bind(this),ref:"amount",type:"text",className:"form-control text-right",value:this.state.amount,onChange:this.handleChangeProperty.bind(this,"amount")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("select",{className:"form-control",value:this.state.categoryId,onChange:this.handleChangeProperty.bind(this,"categoryId")},o.a.createElement("option",null,"-select category-"),this.state.categories.map(function(e){return o.a.createElement("option",{key:e.categoryId,value:e.categoryId},e.name)}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{placeholder:"Date",type:"datetime-local",ref:"date",className:"form-control",value:this.state.date,onChange:this.handleChangeProperty.bind(this,"date")})),o.a.createElement("div",{className:"form-group"},o.a.createElement("textarea",{placeholder:"Description",rows:"5",className:"form-control",value:this.state.description,onChange:this.handleChangeProperty.bind(this,"description")})))))}}]),t}(n.Component),M=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("main",null,o.a.createElement(d.a,null,o.a.createElement(h.a,{exact:!0,path:"/",component:v}),o.a.createElement(h.a,{path:"/income",component:C}),o.a.createElement(h.a,{path:"/expense/edit/:id",component:D}),o.a.createElement(h.a,{path:"/expense/new",component:S}),o.a.createElement(h.a,{path:"/expense",component:I})))}}]),t}(n.Component),A=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("nav",{id:"sidebar"},o.a.createElement("div",{id:"dismiss"},o.a.createElement("i",{className:"fas fa-arrow-left"})),o.a.createElement("div",{className:"sidebar-header"},o.a.createElement("p",null),o.a.createElement("h4",null,"moneytoring")),o.a.createElement("ul",{className:"list-unstyled components nav-links"},o.a.createElement("li",null,o.a.createElement(N.a,{to:"/"},o.a.createElement("i",{className:"fas fa-tachometer-alt mr-2"}),"Dashboard")),o.a.createElement("li",null,o.a.createElement(N.a,{to:"/income"},o.a.createElement("i",{className:"fas fa-dollar-sign mr-2"}),"Income")),o.a.createElement("li",null,o.a.createElement(N.a,{to:"/expense"},o.a.createElement("i",{className:"fas fa-tags mr-2"}),"Expense"))))}}]),t}(n.Component),T=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper"},o.a.createElement(A,null),o.a.createElement(M,null),o.a.createElement("div",{className:"overlay"}))}}]),t}(n.Component),B=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var Y=a(42);!function(){var e=window.indexedDB.open("Moneytoring",2);e.onupgradeneeded=function(e){var t=e.target.result;if(t.onerror=function(e){},!t.objectStoreNames.contains("expense")){var a=t.createObjectStore("expense",{keyPath:"expenseId",autoIncrement:!0});a.createIndex("expenseId","expenseId",{unique:!0}),a.createIndex("title","title",{unique:!1}),a.createIndex("categoryId","categoryId",{unique:!1}),a.createIndex("amount","amount",{unique:!1}),a.createIndex("accountId","accountId",{unique:!1}),a.createIndex("description","description",{unique:!1}),a.createIndex("date","date",{unique:!1})}t.objectStoreNames.contains("account")||t.createObjectStore("account",{keyPath:"accountId",autoIncrement:!0}).createIndex("name","name",{unique:!1}),t.objectStoreNames.contains("category")||t.createObjectStore("category",{keyPath:"categoryId",autoIncrement:!0}).createIndex("name","name",{unique:!1})},e.onsuccess=function(e){var t=e.target.result,a=t.transaction(["account"],"readonly"),n=a.objectStore("account").getAll();a.oncomplete=function(e){0===n.result.length&&t.transaction(["account"],"readwrite").objectStore("account").put({name:"personal"})};var o=t.transaction(["category"],"readonly"),r=o.objectStore("category").getAll();o.oncomplete=function(e){if(0===r.result.length){var a=t.transaction(["category"],"readwrite").objectStore("category");a.put({name:"food"}),a.put({name:"transportation"}),a.put({name:"clothing"})}}}}(),c.a.render(o.a.createElement(Y.a,null,o.a.createElement(T,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");B?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):P(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):P(t,e)})}}()}},[[22,2,1]]]);
//# sourceMappingURL=main.37f6bd1c.chunk.js.map