'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/navigation";

export default function Home() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !senha) {
      setError("Preencha todos os campos")
      return
    }

    try {
      console.log()
      const res = await signIn(
        email,
        senha
      )
      console.log(res)

      if (res.status=='404') {
        setError("Email não encontrado")
        return
      }

      if (res.status=='401') {
        setError("Senha incorreta")
        return
      }


      router.replace("mainPage")
    } catch (error) {
    }
  };

  async function signIn(email, senha) {
    try {
      const resposta = await fetch('api/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      })

      return resposta

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="bg-indigo-700 text-center text-indigo-600">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-600 md:text-2xl dark:text-white">
                Entre na sua conta
              </h1>
              <form onSubmit={handleSubmit} className=" space-y-4 md:space-y-6" action="#">
                <div className='text-left'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Email</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@gmail.com" required="" />
                </div>
                <div className='text-left'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Senha</label>
                  <input onChange={(e) => setSenha(e.target.value)} type="password" name="senha" id="senha" placeholder="••••••••" className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-indigo-300 rounded bg-indigo-50 focus:ring-3 focus:ring-primary-300 dark:bg-indigo-700 dark:border-indigo-600 dark:focus:ring-primary-600 dark:ring-offset-indigo-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-indigo-500 dark:text-indigo-300">Manter Conectado</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu sua senha?</a>
                </div>
                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Entrar</button>

                {error && (
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                  </div>
                )}

                <p className="text-sm font-light text-indigo-500 dark:text-indigo-400">
                  Não tem uma conta? <Link href="/registrar" className="font-medium text-indigo-600 hover:underline dark:text-primary-500">Criar conta</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
