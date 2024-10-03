const bcrypt = require("bcrypt");

const senha = "1234";
const teste = 10;

bcrypt.hash(senha, teste, (err, hash) => {
  if (err) throw err;
  console.log(hash);
});

const senhaArmazenada =
  "$2b$10$dwYzk7p6zOMxKdhWKmPIUuoqUToS8BHI9ADu4Bpf/PADZ/JJrweqi";

bcrypt.compare("1234", senhaArmazenada, (err, result) => {
  if (err) throw err;
  if (result) {
    console.log(`VALIDOU`);
  } else {
    console.log(`Não deu!`);
  }
});
