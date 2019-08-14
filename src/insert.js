let department = [
    '5d4ff3ac1e08f200122813a3',
    '5d4ff3dd1e08f200122813a4',
    '5d4ff41f1e08f200122813a5',
    null
]
let name = [
    'Viktor',
    'Vlad',
    'Igor',
    'Oleg',
    'Bogdan',
    'Roman',
    'Ivan',
    'Stas',
    'Volodya',
    'Dmitro'
]
let sname = [
    'Nakaznyi',
    'Olefir',
    'Khalan',
    'Temniy',
    'Dvorovenko',
    'Ivanov',
    'Pavlenko',
    'Kozub',
    'Petrov',
    'Smirnov'
]
let emails = [
    'gmail.com',
    'yandex.ua',
    'ukr.net',
    'mail.ru',
    'rambler.ru'
]
let phones = [
    '+38050',
    '+38066',
    '+38095',
    '+38073',
    '+38068'
]
let result = []
for (let i = 1; i <= 50; i++) {
    let _name = name[Math.round(Math.random() * 9)] + ' ' + sname[Math.round(Math.random() * 9)]
    let size = Math.round(Math.random() * 3)
    let _emails = []
    for (let i = 0; i < size; i++) _emails.push(_name.replace(' ', '.') + '@' + emails[Math.round(Math.random() * 4)])
    size = Math.round(Math.random() * 3)
    let _phones = []
    for (let i = 0; i < size; i++) _phones.push(phones[Math.round(Math.random() * 4)] + (Math.round(Math.random() * 8999999) + 1000000))
    let _age = Math.round(Math.random() * 27) + 18
    result.push({
        name: _name,
        emails: _emails,
        phones: _phones,
        age: _age,
        department: department[Math.round(Math.random() * 3)]
    })
}
console.log(result)