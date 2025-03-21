
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Sign In to EduQuest</h1>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
