import Notiflix from 'notiflix';

const formPromise=document.querySelector(".form");
const inputDelay=formPromise.querySelector('input[name="delay"]');
const inputPosition=formPromise.querySelector('input[name="step"]');
const inputAmount=formPromise.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}


formPromise.addEventListener('submit', (e)=>{
  e.preventDefault();
  const firstDelay=inputDelay.value
  const delayStep=inputPosition.value
  const amount=inputAmount.value
  
  for (let i = 0; i < amount; i++) {
    const position=i+1;
    const delay=firstDelay+i*delayStep
    createPromise(position, delay).then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }).catch(({position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
  formPromise.reset()
})

