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
public class PopUpStoreList {

  @Id
  private long reserveId;
  private String popUpStoreNo;
  private long userNo;
  private java.sql.Date reserveDate;
  private java.sql.Time reserveTime;
  private long raffleExist;
  private long applyExist;


}
