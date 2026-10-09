import {html,render,signal,useEffect} from 'utils/preact.js'
import styled from 'utils/styled.js'

import {Dialog} from '../dialog/dialog.js'
import testCss from "./article.css.js";
import gs from "./gs.js";
import dialogCss from "./dialog.css.js";

const count = signal(0);


 function Home() {

	const showDialog=(v)=>{
		const Page=(()=>html`
			<${dialogCss}>
				<h1>${v.title}</h1>
				<h4>${v.auther}</h4>
				<div class=div><div class=text>${v.article}</div></div>
			<//>
		`)
		Dialog.show(Page)
	}

	return html`<${testCss} className="div6">
    <h1>宋词</h1>
   
    <div class="div-body">
      ${gs.map(
		(v) => html`
          <div class="row" onClick=${()=>showDialog(v)}>
            <div class="row-text">${v.title}</div>
            <div class="row-arrow">${v.auther}</div>
          </div>
        `
	)}
    </div>
  <//>`;
}
export default  Home
