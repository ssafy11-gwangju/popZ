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
public class Account {

  @Id
  private long userNo;
  private String userAccount;
  private long userBalance;
  private long userPoint;


}
