import { z } from 'zod';
// エラーメッセージの設定
export const validationSchema = z
  .object({
    name: z.string().nonempty('名前は必須です').min(4, '4文字以上でお願いします'),
    mail: z
      .string()
      .nonempty('メールアドレスは必須です')
      .email('正しいメールアドレスをお願いします'),
    password: z.string().nonempty('パスワードは必須です').min(6, '6文字以上でお願いします').max(20),
    confirmPassword: z.string().min(6, '6文字以上でお願いします').max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });
