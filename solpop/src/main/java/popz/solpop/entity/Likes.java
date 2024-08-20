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
public class Likes {

  @Id
  private long likeNo;
  private String popUpStoreNo;
  private long userNo;


}
