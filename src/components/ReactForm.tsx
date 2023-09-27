import './ReactForm.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '@/utils/validationSchema';

// utilsのvalidationSchemaに移行
// エラーメッセージの設定
// const validationSchema = z
//   .object({
//     name: z.string().nonempty('名前は必須です').min(4, '4文字以上でお願いします'),
//     mail: z
//       .string()
//       .nonempty('メールアドレスは必須です')
//       .email('正しいメールアドレスをお願いします'),
//     password: z.string().nonempty('パスワードは必須です').min(6, '6文字以上でお願いします').max(20),
//     confirmPassword: z.string().min(6, '6文字以上でお願いします').max(20),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'パスワードが一致しません',
//     path: ['confirmPassword'],
//   });

interface LoginData {
  name: string;
  mail: string;
  password: string;
  confirmPassword: string;
}

export const ReactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onChange', resolver: zodResolver(validationSchema) });

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };

  return (
    <div className="body">
      <div className="form-container">
        <h1>react-hook-form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">名前</label>
          <input type="text" id="name" {...register('name')} />
          <p>{errors.name?.message as React.ReactNode}</p>

          <label htmlFor="mail">メールアドレス</label>
          <input type="email" id="mail" {...register('mail')} />
          <p>{errors.mail?.message as React.ReactNode}</p>

          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" {...register('password')} />
          <p>{errors.password?.message as React.ReactNode}</p>

          <label htmlFor="confirmPassword">パスワード</label>
          <input type="password" id="confirmPassword" {...register('confirmPassword')} />
          <p>{errors.confirmPassword?.message as React.ReactNode}</p>

          <button type="submit">送信</button>
        </form>
      </div>
    </div>
  );
};
