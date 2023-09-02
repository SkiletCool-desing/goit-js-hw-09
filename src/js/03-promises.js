const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const formRef = e.target;

  let delay = Number(formRef.delay.value);
  let step = Number(formRef.step.value);

  for (let i = 1; i <= formRef.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
  formRef.reset();
}

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        
        resolve(obj);
      } else {
        
        reject(obj);
      }
    }, delay);
  });
}
