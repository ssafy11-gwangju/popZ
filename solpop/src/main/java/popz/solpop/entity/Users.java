package popz.solpop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;


@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Users {

  @Id
  private long userNo;
  private String userLevel;
  private String userId;
  private String userPw;
  private String userName;
  private long userInfoStatus;
  private long userExp;


}
