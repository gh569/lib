import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Step4 from "./step4"
import Step5 from "./step5"
import Step6 from "./step6"
import Step7 from "./step7"

export default ({step,cancelNext })=>{
	if(step===1) return <Step1 cancelNext={cancelNext} />
	if(step===2) return <Step2 cancelNext={cancelNext}  />
	if(step===3) return <Step3 cancelNext={cancelNext}  />
	if(step===4) return <Step4 cancelNext={cancelNext}  />
	if(step===5) return <Step5 cancelNext={cancelNext}  />
	if(step===6) return <Step6 cancelNext={cancelNext}  />
	return <Step7 cancelNext={cancelNext}  />
}