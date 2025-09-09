// Форма як компонент
// На практиці форма – це окремий компонент, 
// який відповідає лише за збір значень своїх полів. А те, що потрібно зробити з цими значеннями – наприклад, відправити замовлення чи зареєструвати користувача – передається у вигляді пропса ззовні.



// У багатьох випадках форма не вирішує, що робити з даними – 
// вона їх просто збирає.

// Зробимо форму замовлення OrderForm, яка приймає пропс
//  onSubmit, викликає його при сабміті, і передає туди дані.

interface OrderFormProps {
    onSubmit: (value: string) => void;
}

export default function OrderForm ({onSubmit}: OrderFormProps) {
    const handleSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        onSubmit(username);
    }

    // 💡 Назва пропса (onSubmit, onOrder, onSend) може бути будь-якою –
    //  головне, щоб було зрозуміло, що він означає. Це ваш власний пропс,
    //  а не атрибут елемента form.

return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Place order</button>
    </form>
  );
}