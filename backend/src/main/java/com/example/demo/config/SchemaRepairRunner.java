package com.example.demo.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class SchemaRepairRunner implements ApplicationRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchemaRepairRunner.class);

    private final JdbcTemplate jdbcTemplate;

    public SchemaRepairRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        try {
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP");
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP");
            jdbcTemplate.execute("""
                    CREATE TABLE IF NOT EXISTS sessions (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        user_id BIGINT NOT NULL REFERENCES users(id),
                        token VARCHAR(36) NOT NULL UNIQUE,
                        expires_at TIMESTAMP NOT NULL,
                        created_at TIMESTAMP NOT NULL,
                        last_accessed_at TIMESTAMP,
                        is_revoked BOOLEAN NOT NULL DEFAULT FALSE
                    )
                    """);
            jdbcTemplate.execute("CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)");
            jdbcTemplate.execute("CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)");
            jdbcTemplate.execute("CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)");
        } catch (Exception ex) {
            LOGGER.warn("Schema repair skipped: {}", ex.getMessage());
        }
    }
}
