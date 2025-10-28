# Modelo de Entidades para Relato de Incidentes (Formato .md)

## 1. Entidade: Incidente

- **Propósito:** Registro oficial e gerenciamento do evento de segurança.
- **Atributos:**
    - `id_incidente`: (Chave Primária - PK) INTEGER / BIGINT
    - `titulo_incidente`: VARCHAR(255)
    - `data_hora_deteccao`: TIMESTAMP
    - `data_hora_registro`: TIMESTAMP
    - `descricao_detalhada`: TEXT
    - `status`: VARCHAR(50) (Ex: 'Aberto', 'Em Análise', 'Fechado')
    - `severidade`: VARCHAR(50) (Ex: 'Baixa', 'Média', 'Alta')
    - `data_hora_fechamento`: TIMESTAMP
    - `id_tipo_incidente`: (Chave Estrangeira - FK) INTEGER / BIGINT (Referencia TipoIncidente)
    - `id_analista_responsavel`: (Chave Estrangeira - FK) INTEGER / BIGINT (Referencia Usuario)

---

## 2. Entidade: Relato

- **Propósito:** Armazenar a informação bruta e original fornecida pelo relator.
- **Atributos:**
    - `id_relato`: (Chave Primária - PK) INTEGER / BIGINT
    - `id_incidente`: (Chave Estrangeira - FK) INTEGER / BIGINT (Referencia Incidente)
    - `data_hora_envio`: TIMESTAMP
    - `detalhes_preliminares`: TEXT
    - `nome_relator`: VARCHAR(255) (Pode ser 'Anônimo')
    - `email_relator`: VARCHAR(255)
    - `unidade_departamento`: VARCHAR(100)
    - `data_hora_ocorrencia_estimada`: TIMESTAMP

---

## 3. Entidade: TipoIncidente

- **Propósito:** Classificação e categorização padronizada dos incidentes.
- **Atributos:**
    - `id_tipo_incidente`: (Chave Primária - PK) INTEGER / BIGINT
    - `nome_tipo`: VARCHAR(100) (Ex: "Phishing", "Vazamento de Dados")
    - `descricao_tipo`: VARCHAR(500)
    - `norma_referencia`: VARCHAR(100) (Ex: "NIST SP 800-61")

---

## 4. Entidade: AcaoTomada

- **Propósito:** Histórico de todas as investigações, mitigações e correções realizadas.
- **Atributos:**
    - `id_acao`: (Chave Primária - PK) INTEGER / BIGINT
    - `id_incidente`: (Chave Estrangeira - FK) INTEGER / BIGINT (Referencia Incidente)
    - `id_analista`: (Chave Estrangeira - FK) INTEGER / BIGINT (Referencia Usuario)
    - `data_hora_acao`: TIMESTAMP
    - `descricao_acao`: TEXT
    - `tipo_acao`: VARCHAR(100) (Ex: "Contenção", "Erradicação")
    - `eficacia_avaliacao`: VARCHAR(100)

---

## 5. Entidade: Usuario

- **Propósito:** Gestão de analistas e gestores da STI que interagem com o sistema.
- **Atributos:**
    - `id_usuario`: (Chave Primária - PK) INTEGER / BIGINT
    - `nome`: VARCHAR(255)
    - `matricula_siape`: VARCHAR(50)
    - `email`: VARCHAR(255)
    - `papel_perfil`: VARCHAR(50) (Ex: 'Analista CSIRT', 'Gestor STI')
    - `setor_lotacao`: VARCHAR(100) (Ex: 'STI/Núcleo de Segurança')
    - `ativo`: BOOLEAN
