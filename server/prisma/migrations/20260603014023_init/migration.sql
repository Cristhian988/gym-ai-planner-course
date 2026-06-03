-- CreateTable
CREATE TABLE "user_profile" (
    "user_id" UUID NOT NULL,
    "goal" VARCHAR(20) NOT NULL,
    "experience" VARCHAR(20) NOT NULL,
    "days_per_week" INTEGER NOT NULL CHECK ("days_per_week" BETWEEN 1 AND 7),
    "session_length" INTEGER NOT NULL CHECK ("session_length" > 0),
    "equipment" VARCHAR(20) NOT NULL,
    "injuries" TEXT,
    "preferred_split" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_id"),
    CONSTRAINT "user_profile_goal_chk" CHECK ("goal" IN ('cut','bulk','recomp','strength','endurance')),
    CONSTRAINT "user_profile_experience_chk" CHECK ("experience" IN ('beginner','intermediate','advanced')),
    CONSTRAINT "user_profile_equipment_chk" CHECK ("equipment" IN ('full_gym','home','dumbbells')),
    CONSTRAINT "user_profile_split_chk" CHECK ("preferred_split" IN ('full_body','upper_lower','ppl','custom'))
);
