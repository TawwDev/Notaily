package notaily.notaily_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import notaily.notaily_backend.constant.Gender;
import notaily.notaily_backend.constant.UserStatus;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String hashedPassword;

    private String displayName;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private Gender gender;

    @Column(unique = true, nullable = false)
    private String email;


    private String phone;
    private String avatarUrl;
    private LocalDate createdDate;
    private LocalDate updatedDate;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notebook> notebooks = new ArrayList<>();

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes = new ArrayList<>();

    @OneToMany(mappedBy = "sharedByUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Share> sharesSent = new ArrayList<>();

    @OneToMany(mappedBy = "sharedWithUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Share> sharesReceived = new ArrayList<>();
}
