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
public class UserLevelBenefit {

  @Id
  private String userLevel;
  private long goodsDiscount;
  private long field;


}
