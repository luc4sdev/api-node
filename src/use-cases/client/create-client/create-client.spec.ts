// import { compare } from 'bcryptjs';
// import { CreateClientUseCase } from './create-client';
// import { expect, describe, it, beforeEach } from 'vitest'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-clients.repository'; ';

// let usersRepository: InMemoryUsersRepository
// let sut: CreateClientUseCase

// describe('Register Use Case', () => {
//     beforeEach(() => {
//         usersRepository = new InMemoryUsersRepository()
//         sut = new CreateClientUseCase(usersRepository)
//     })

//     it('should hash user password upon registration', async () => {

//         const { user } = await sut.execute({
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             password: '123456'
//         })

//         const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

//         expect(isPasswordCorrectlyHashed).toBe(true)
//     })


//     it('should not be able to register with same email twice', async () => {

//         const email = 'johndoe@example.com'

//         await sut.execute({
//             name: 'John Doe',
//             email,
//             password: '123456'
//         })

//         await expect(() =>
//             sut.execute({
//                 name: 'John Doe',
//                 email,
//                 password: '123456'
//             })
//         ).rejects.toBeInstanceOf(UserAlreadyExistsError)

//     })


//     it('should be able to register', async () => {

//         const { user } = await sut.execute({
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             password: '123456'
//         })

//         expect(user.id).toEqual(expect.any(String))
//     })
// })