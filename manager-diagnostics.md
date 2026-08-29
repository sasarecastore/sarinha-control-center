# Diagnóstico do Sasarinha Manager

Fonte observada: https://sasarinha-573kbfhm.manus.space

O APK contém a URL pública acima. A consulta `GET /api/trpc/appStatus` respondeu `{"result":{"data":{"json":{"isOnline":true}}}}`.

O app oficial usa `trpc.access.loginWithKey` para entrar no Key Manager, com `APP_VERSION = "1.1.1"`. O site principal deve usar `keys.validate`, que recebe `keyValue` e `deviceId`, porque as keys do app principal não servem para acessar o Key Manager.

Teste do site publicado em https://sarinahub-mcqz8esj.manus.space com uma key inválida exibiu: “Key de acesso inválida ou sem perfil associado.” Isso confirma que a versão publicada ainda estava chamando `access.loginWithKey` no momento desse teste; a correção para `keys.validate` precisa ser publicada em uma nova versão antes do teste positivo.
