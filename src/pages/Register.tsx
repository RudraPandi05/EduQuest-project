
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Create Your EduQuest Account</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
