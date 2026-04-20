UPDATE "about_content_uploads"
SET
  "section" = 'founder',
  "updated_at" = NOW()
WHERE "section" = 'quote';
