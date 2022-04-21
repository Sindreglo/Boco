package boco.repository.profile;

import boco.models.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository <Profile, Long> {
    public Optional<Profile> findProfileByUsernameOrEmail(String username, String email);
}