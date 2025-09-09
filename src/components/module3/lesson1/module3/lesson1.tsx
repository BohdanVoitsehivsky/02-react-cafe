import OrderForm from "./lesson1FormAscomponent";

export default function App1() {
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    

        // Щоб обробити відправку форми, додаємо атрибут onSubmit і передаємо 
        // в нього функцію, яка отримає подію типу React.FormEvent<HTMLFormElement>.
    // event.preventDefault() – блокує стандартну поведінку HTML-форми (перезавантаження сторінки).
// event.currentTarget – це сама форма <form>, з якої можна зчитати всі значення.
//   
// отримання значень через FormData

// const formData = new FormData(form);
// const username = formData.get("username")
// console.log("username:", username);
// form.reset()
// FormData – це вбудований клас JavaScript, який дозволяє 
// легко зчитувати значення полів форми.



// Коли ви створюєте new FormData(form), браузер автоматично:

// бере всі поля (<input>, <textarea>, <select>) з цієї форми;
// зчитує їх імена (name="...") і значення;
// зберігає їх у вигляді пари ключ-значення (name: value), як об'єкт.


// FormData працює лише з тими елементами, які мають атрибут name.
//  Без нього значення поля зчитано не буде.




//  Form Actions

// Кожен раз при відправці форми ми пишемо один і той самий шаблонний код:

// Блокуємо стандартну поведінку браузера (event.preventDefault())
// Створюємо об’єкт FormData, щоб дістати значення полів
// Опрацьовуємо дані
// Це рутинний код, який можна 
// автоматизувати завдяки Form Actions –
//  спеціального способу обробки форм, який надає React.
const handleSubmit = (formData: FormData) => {
	  
// В такому випадку React:

// перехоплює і зупиняє подію submit
// формує об’єкт FormData
// викликає функцію handleSubmit(formData)
// formData – це не подія. Це об’єкт із готовими значеннями полів


// Для отримання значень використовуємо метод formData.get("назва_поля"):
const username = formData.get("username") as string;
console.log(username);

// 🧠 formData.get() повертає значення типу FormDataEntryValue | null. У текстових полях це зазвичай рядок, але TypeScript цього не знає. 
// Тому треба явно вказати тип значення за допомогою as тип.





// Попереднє заповнення форми 
// Коли потрібно, щоб поле у формі було вже заповнене при відкритті, 
// в React використовують атрибут defaultValue. 
// Він задає початкове значення інпута або текстової області.



};
const handleOrder = (data: string) => {
    console.log("Order recived from:", data);
    
}

return (
	//   <form onSubmit={handleSubmit}>
    // <form action={handleSubmit}>
    //   <input type="text" name="username" defaultValue= "Name Sername"/>
    //   <button type="submit">Submit</button>
    // </form>
    <>
    <h1>Place your order</h1>
      <OrderForm onSubmit={handleOrder} />
    </>
  );
//   Що тут важливо:

// OrderForm не знає, що буде з даними – вона просто викликає onSubmit(data)
// Компонент форми не залежить від того, як саме обробляються дані
//  – це зовнішня відповідальність.
// Код стає чистішим: форма не має логіки, яку вона не повинна знати.


}



//  http запити

